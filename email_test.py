import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Load secrets
try:
    with open("email_secrets.json", "r") as f:
        config = json.load(f)
except FileNotFoundError:
    print("Error: email_secrets.json niet gevonden.")
    exit(1)

if "VUL_HIER" in config["password"]:
    print("⚠️  LET OP: Je moet eerst je wachtwoord invullen in email_secrets.json!")
    exit(1)

# Setup email
msg = MIMEMultipart()
msg["From"] = config["email"]
msg["To"] = config["target_email"]
msg["Subject"] = "🚀 AssetLink Test: System Online"

body = "Dit is een testbericht vanuit je eigen AssetLink Assistant.\n\nAls je dit leest, werkt de e-mailmodule correct.\n\nGroet,\nJe AI."
msg.attach(MIMEText(body, "plain"))

# Send
try:
    print(f"Verbinden met {config['smtp_server']}...")
    server = smtplib.SMTP(config["smtp_server"], config["smtp_port"])
    server.starttls()
    print("Inloggen...")
    server.login(config["email"], config["password"])
    print("Verzenden...")
    server.send_message(msg)
    server.quit()
    print("✅ Succes! E-mail is verzonden.")
except Exception as e:
    print(f"❌ Fout bij verzenden: {e}")
