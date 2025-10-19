---
title: Manual Installation
description: Install Dnote server as a standalone binary
weight: 2
---

## Quick Start

Download the server binary for your platform and architecture from [releases](https://github.com/dnote/dnote/releases):

```bash
# Extract and install
tar -xzf dnote-server-*.tar.gz
sudo mv dnote-server /usr/local/bin/

# Run
dnote-server start
```

Server runs on `http://localhost:3001`.

Database: `$XDG_DATA_HOME/dnote/server.db` (typically `~/.local/share/dnote/server.db`)

## Systemd Service

Create user and directories:

```bash
sudo useradd -r -s /bin/false dnote
sudo mkdir -p /var/lib/dnote
sudo chown dnote:dnote /var/lib/dnote
```

Create `/etc/systemd/system/dnote.service`:

```ini
[Unit]
Description=Dnote Server
After=network.target

[Service]
Type=simple
User=dnote
Group=dnote
Restart=always
RestartSec=3
WorkingDirectory=/var/lib/dnote

ExecStart=/usr/local/bin/dnote-server start

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now dnote
sudo systemctl status dnote
```

View logs:

```bash
sudo journalctl -u dnote -f
```

## Reverse Proxy

### Nginx

Create `/etc/nginx/sites-available/dnote`:

```nginx
server {
    listen 80;
    server_name dnote.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dnote.example.com;

    ssl_certificate /etc/letsencrypt/live/dnote.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dnote.example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/dnote /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache

Enable modules:

```bash
sudo a2enmod proxy proxy_http ssl headers
```

Create `/etc/apache2/sites-available/dnote.conf`:

```apache
<VirtualHost *:80>
    ServerName dnote.example.com
    Redirect permanent / https://dnote.example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName dnote.example.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/dnote.example.com/fullchain.pem
    SSLCertificateKey /etc/letsencrypt/live/dnote.example.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/

    RequestHeader set X-Forwarded-Proto "https"
</VirtualHost>
```

Enable:

```bash
sudo a2ensite dnote
sudo systemctl reload apache2
```

### SSL (Let's Encrypt)

```bash
# Nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d dnote.example.com

# Apache
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d dnote.example.com
```

## Backups

Create backup directory:

```bash
sudo mkdir -p /var/lib/dnote/backups
sudo chown dnote:dnote /var/lib/dnote/backups
```

Daily backup at 2 AM (run as dnote user):

```bash
sudo crontab -u dnote -e
```

Add:

```
0 2 * * * sqlite3 /var/lib/dnote/server.db ".backup /var/lib/dnote/backups/server-$(date +\%Y\%m\%d).db"
```

Optional: Cleanup old backups (keep 30 days):

```
0 3 * * * find /var/lib/dnote/backups -name "server-*.db" -mtime +30 -delete
```

## Troubleshooting

Check service status:

```bash
sudo systemctl status dnote
sudo journalctl -u dnote -n 50 --no-pager
```

Test database access:

```bash
sudo -u dnote sqlite3 /var/lib/dnote/server.db ".tables"
```

Verify configuration:

```bash
# Check if server responds
curl http://localhost:3001

# Check environment variables
sudo systemctl show dnote --property=Environment
```

## Supported Platforms

Pre-built binaries are available for the following platforms and architectures:

- **Linux**: amd64, arm64, armv7 (ARM 32-bit), 386
- **FreeBSD**: amd64

## Connecting CLI to Server

Edit your Dnote CLI config at `$XDG_CONFIG_HOME/dnote/dnoterc` (typically `~/.config/dnote/dnoterc`):

```yaml
apiEndpoint: https://dnote.example.com/api
```

Then log in:

```bash
dnote login
```

See [CLI configuration](../../cli/configuration/) for more details.
