"""Demo bot API. Not production authenticated; never connect it to private E2EE content."""
from typing import Literal
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="PROJECT_NOVA Bot API", version="0.1.0")

class CommandRequest(BaseModel):
    command: Literal["help", "ping", "about"]
    args: list[str] = Field(default_factory=list, max_length=10)

@app.get("/health")
def health():
    return {"ok": True, "service": "project-nova-bot-api", "mode": "demo"}

@app.post("/v1/command")
def command(body: CommandRequest):
    if body.command == "ping":
        result = "pong"
    elif body.command == "about":
        result = "PROJECT_NOVA bot API demo. No private messages are accessed."
    else:
        result = "Available commands: /help, /ping, /about"
    return {"ok": True, "command": body.command, "result": result}
