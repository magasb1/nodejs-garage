# Nodejs Garage

https://medium.com/@ethantcollins98/setting-and-using-cookies-with-a-node-js-express-server-49479673d043

https://www.bezkoder.com/node-js-jwt-authentication-mysql/#Controller_for_Authentication
    

## Raspberry Pi

Flash image and create two new files on boot-drine:
-  `ssh`
-  `wpa_supplicant.conf`

Paste the following in wpa_supplicant-file:

```bash
country=NO
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="SSID"
    psk="Password"
}
```

After booting the raspi, install docker and docker-compose:

```bash
#!/bin/sh

set -o errexit
set -o nounset

IFS=$(printf '\n\t')

# Git & Node.js
DEBIAN_FRONTEND=noninteractive apt install -y -qq git nodejs npm

# Docker
apt-get update && sudo apt-get upgrade -y -qq >/dev/null
curl -sSL https://get.docker.com | sh
sudo usermod -aG docker ${USER}
printf '\nDocker installed successfully\n\n'

sudo systemctl enable docker.service
sudo systemctl enable containerd.service

sudo sysctl -w net.ipv4.ip_forward=1
sysctl -p
printf 'Waiting for Docker to start...\n\n'
sleep 5

# Docker Compose
DEBIAN_FRONTEND=noninteractive apt install -y -qq libffi-dev libssl-dev python3-dev python3 python3-pip
sudo pip3 install docker-compose


printf '\nDocker Compose installed successfully\n\n'
```