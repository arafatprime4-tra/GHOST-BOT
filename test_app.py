import unittest
from fastapi.testclient import TestClient
from app import app

class BotApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health(self):
        r = self.client.get('/health')
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()['ok'])

    def test_ping(self):
        r = self.client.post('/v1/command', json={'command': 'ping'})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['result'], 'pong')

    def test_unknown_command_rejected(self):
        r = self.client.post('/v1/command', json={'command': 'steal_data'})
        self.assertEqual(r.status_code, 422)

if __name__ == '__main__':
    unittest.main()
