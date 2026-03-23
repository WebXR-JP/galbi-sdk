"""tRPC HTTP client for the Galbi API using only urllib.

tRPC v11 with default transformer (no superjson) wire format:
  Request:  {"0": input_value}
  Response: [{"result": {"data": result_value}}]
"""

import json
import urllib.request
import urllib.error


class GalbiAPIClient:
    """Communicates with the Galbi tRPC API over HTTP."""

    def __init__(self, base_url):
        self.base_url = base_url.rstrip("/")

    def _request(self, procedure, input_value, timeout=30):
        """Send a tRPC batch request and return the result."""
        url = f"{self.base_url}/share/trpc/{procedure}?batch=1"
        data = json.dumps({"0": input_value}).encode("utf-8")

        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                body = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            msg = f"HTTP {exc.code}"
            try:
                detail = exc.read().decode("utf-8", errors="replace")
                msg = f"{msg}: {detail[:200]}"
            except Exception:
                pass
            raise RuntimeError(f"Server error: {msg}") from exc
        except urllib.error.URLError as exc:
            raise RuntimeError(f"Connection error: {exc.reason}") from exc
        except TimeoutError as exc:
            raise RuntimeError("Timeout: server did not respond") from exc

        if not isinstance(body, list) or len(body) == 0:
            raise RuntimeError(f"Unexpected response format: {body!r}")

        item = body[0]
        if "error" in item:
            raise RuntimeError(f"API error: {item['error']}")

        try:
            return item["result"]["data"]
        except (KeyError, TypeError) as exc:
            raise RuntimeError(
                f"Unexpected response structure: {json.dumps(item)[:300]}"
            ) from exc

    def create_anonymous_model(self):
        """Create an anonymous model entry.

        Returns dict with keys: modelId, accessToken, publicUrl, expiresAt.
        """
        return self._request(
            "anonymous.createAnonymousModel",
            {},
        )

    def upload_model(self, model_id, access_token, name, glb_base64):
        """Upload a GLB model (base64-encoded) to an existing anonymous model.

        Returns the upload result dict.
        """
        return self._request(
            "anonymous.uploadModel",
            {
                "modelId": model_id,
                "accessToken": access_token,
                "model": {
                    "name": name,
                    "data": glb_base64,
                },
            },
            timeout=120,
        )
