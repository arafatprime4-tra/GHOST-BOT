import 'package:flutter_test/flutter_test.dart';
import 'package:project_nova/main.dart';

void main() {
  testWidgets('shows starter branding and navigation', (tester) async {
    await tester.pumpWidget(const NovaApp());
    expect(find.text('PROJECT_NOVA'), findsOneWidget);
    expect(find.text('MESSAGES'), findsOneWidget);
    expect(find.text('DEMO BUILD • NO REAL MESSAGES OR E2EE YET'), findsOneWidget);
  });
}
