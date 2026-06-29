# Useful Commands

## SSH Tunnels

### phpMyAdmin (db.manga-db.org → localhost)

phpMyAdmin runs on `127.0.0.1:8080` on the server (proxied by nginx at `db.manga-db.org`).
Tunnel it to your local machine:

```bash
ssh -L 8080:localhost:8080 root@<server-ip>
```

Then open: [http://localhost:8080](http://localhost:8080)

The tunnel stays open as long as the SSH session is active. To keep it running without an interactive shell:

```bash
ssh -N -L 8080:localhost:8080 root@<server-ip>
```

(`-N` = no remote command, just the tunnel)

---

## PM2 (Backend Services)

```bash
pm2 list                  # show all services + status
pm2 logs                  # stream all logs
pm2 logs mangadb-api      # stream logs for a specific service
pm2 restart mangadb-api   # restart a service
pm2 restart all           # restart everything
pm2 stop all              # stop all services
pm2 save                  # persist current process list across reboots
```

Service names (from `ecosystem.config.js`):

| Name | Description |
|---|---|
| `mangadb-api` | Main REST API (port 4545) |
| `mangadb-io` | File service (port 4546) |
| `mangadb-cdn` | Image CDN (port 5555) |

---

## Nginx

```bash
nginx -t                        # test config syntax
systemctl reload nginx          # reload without downtime
systemctl restart nginx         # full restart
cat /var/log/nginx/error.log    # error log
```

---

## MySQL

```bash
mysql -u root -p                # interactive shell
mysqldump mangadb > backup.sql  # dump database
mysql mangadb < backup.sql      # restore database
```
