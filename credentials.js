// PUT YOUR REAL CREDENTIALS, DOWNLOADED JSON FROM GOOGLE CLOUD PLATFORM
const credentials = {
	type: "service_account",
	project_id: "data-backup-*******-**",
	private_key_id: "*******",
	private_key:
		"-----BEGIN PRIVATE KEY-----\n*******\n-----END PRIVATE KEY-----\n",
	client_email: "project-name@project-id.iam.gserviceaccount.com",
	client_id: "*******",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/--client-email--",
	universe_domain: "googleapis.com",
}

module.exports = { credentials }
