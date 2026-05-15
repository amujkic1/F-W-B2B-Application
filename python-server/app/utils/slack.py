import httpx
import os

SLACK_WEBHOOK_URL = os.getenv("SLACK_WEBHOOK_URL")

async def notify_slack(message: str):
    """Sends a notification to the configured Slack channel."""
    if not SLACK_WEBHOOK_URL:
        print("Warning: SLACK_WEBHOOK_URL not found in environment.")
        return

    async with httpx.AsyncClient() as client:
        payload = {"text": message}
        try:
            response = await client.post(SLACK_WEBHOOK_URL, json=payload)
            response.raise_for_status()
        except Exception as e:
            print(f"Failed to send Slack alert: {e}")