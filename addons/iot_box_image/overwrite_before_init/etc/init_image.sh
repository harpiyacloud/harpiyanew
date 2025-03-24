#!/usr/bin/env bash
set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"

# Recommends: antiword, graphviz, ghostscript, python-gevent, poppler-utils
export DEBIAN_FRONTEND=noninteractive

# set locale to en_US
echo "set locale to en_US"
echo "en_US.UTF-8 UTF-8" > /etc/locale.gen
locale-gen
# Environment variables
echo "export LANGUAGE=en_US.UTF-8" >> ~/.bashrc
echo "export LANG=en_US.UTF-8" >> ~/.bashrc
echo "export LC_ALL=en_US.UTF-8" >> ~/.bashrc
echo "export DISPLAY=:0" | tee -a ~/.bashrc /home/pi/.bashrc
echo "export XAUTHORITY=/run/lightdm/pi/xauthority" >> /home/pi/.bashrc
echo "export XAUTHORITY=/run/lightdm/root/:0" >> ~/.bashrc
# Aliases
echo  "alias ll='ls -al'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias harpiya='sudo systemctl stop harpiya; sudo -u harpiya /usr/bin/python3 /home/pi/harpiya/harpiya-bin --config /home/pi/harpiya.conf'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias harpiya_logs='less +F /var/log/harpiya/harpiya-server.log'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias write_mode='sudo mount -o remount,rw / && sudo mount -o remount,rw /root_bypass_ramdisks'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias harpiya_conf='cat /home/pi/harpiya.conf'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias read_mode='sudo mount -o remount,ro / && sudo mount -o remount,ro /root_bypass_ramdisks'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias install='sudo mount -o remount,rw / && sudo mount -o remount,rw /root_bypass_ramdisks && sudo chroot /root_bypass_ramdisks/'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias blackbox='ls /dev/serial/by-path/'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias nano='write_mode; sudo -u harpiya nano -l'" | tee -a /home/pi/.bashrc
echo  "alias vim='write_mode; sudo -u harpiya vim -u /home/pi/.vimrc'" | tee -a /home/pi/.bashrc
echo  "alias harpiya_luxe='printf \" ______\n< Luxe >\n ------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\ \n                ||----w |\n                ||     ||\n\"'" | tee -a ~/.bashrc /home/pi/.bashrc
echo  "alias harpiya_start='sudo systemctl start harpiya'" >> /home/pi/.bashrc
echo  "alias harpiya_stop='sudo systemctl stop harpiya'" >> /home/pi/.bashrc
echo  "alias harpiya_restart='sudo systemctl restart harpiya'" >> /home/pi/.bashrc
echo "
harpiya_help() {
  echo '-------------------------------'
  echo ' Welcome to Harpiya IoT Box tools'
  echo '-------------------------------'
  echo ''
  echo 'harpiya                  Starts/Restarts Harpiya server manually (not through harpiya.service)'
  echo 'harpiya_logs             Displays Harpiya server logs in real time'
  echo 'harpiya_conf             Displays Harpiya configuration file content'
  echo 'write_mode            Enables system write mode'
  echo 'read_mode             Switches system to read-only mode'
  echo 'install               Bypasses ramdisks to allow package installation'
  echo 'blackbox              Lists all serial connected devices'
  echo 'harpiya_start            Starts Harpiya service'
  echo 'harpiya_stop             Stops Harpiya service'
  echo 'harpiya_restart          Restarts Harpiya service'
  echo 'harpiya_dev <branch>     Resets Harpiya on the specified branch from harpiya-dev repository'
  echo 'harpiya_origin <branch>  Resets Harpiya on the specified branch from the harpiya repository'
  echo 'devtools              Enables/Disables specific functions for development (more help with devtools help)'
  echo ''
  echo 'Harpiya IoT online help: <https://www.harpiya.com/documentation/master/applications/general/iot.html>'
}

harpiya_dev() {
  if [ -z \"\$1\" ]; then
    harpiya_help
    return
  fi
  write_mode
  pwd=\$(pwd)
  cd /home/pi/harpiya
  sudo git config --global --add safe.directory /home/pi/harpiya
  sudo git remote add dev https://github.com/harpiya-dev/harpiya.git
  sudo git fetch dev \$1 --depth=1 --prune
  sudo git reset --hard dev/\$1
  sudo chown -R harpiya:harpiya /home/pi/harpiya
  cd \$pwd
}

harpiya_origin() {
  if [ -z \"\$1\" ]; then
    harpiya_help
    return
  fi
  write_mode
  pwd=\$(pwd)
  cd /home/pi/harpiya
  sudo git config --global --add safe.directory /home/pi/harpiya
  sudo git remote set-url origin https://github.com/harpiya/harpiya.git  # ensure harpiya repository
  sudo git fetch origin \$1 --depth=1 --prune
  sudo git reset --hard origin/\$1
  sudo chown -R harpiya:harpiya /home/pi/harpiya
  cd \$pwd
}

pip() {
  if [[ -z \"\$1\" || -z \"\$2\" ]]; then
    harpiya_help
    return 1
  fi
  additional_arg=\"\"
  if [ \"\$1\" == \"install\" ]; then
    additional_arg=\"--user\"
  fi
  pip3 \"\$1\" \"\$2\" --break-system-package \$additional_arg
}

devtools() {
  help_message() {
    echo 'Usage: devtools <enable/disable> <general/actions> [action name]'
    echo ''
    echo 'Only provide an action name if you want to enable/disable a specific device action.'
    echo 'If no action name is provided, all actions will be enabled/disabled.'
    echo 'To enable/disable multiple actions, enclose them in quotes separated by commas.'
  }
  case \"\$1\" in
    enable|disable)
      case \"\$2\" in
        general|actions)
          write_mode
          if ! grep -q '^\[devtools\]' /home/pi/harpiya.conf; then
            sudo -u harpiya bash -c \"printf '\n[devtools]\n' >> /home/pi/harpiya.conf\"
          fi
          if [ \"\$1\" == \"disable\" ]; then
            value=\"\${3:-*}\" # Default to '*' if no action name is provided
            devtools enable \"\$2\" # Remove action/general from conf to avoid duplicate keys
            write_mode
            sudo -u harpiya sed -i \"/^\[devtools\]/a\\\\\$2 = \$value\" /home/pi/harpiya.conf
          elif [ \"\$1\" == \"enable\" ]; then
            sudo -u harpiya sed -i \"/\[devtools\]/,/\[/{/\$2 =/d}\" /home/pi/harpiya.conf
          fi
          read_mode
          ;;
        *)
          help_message
          return 1
          ;;
      esac
      ;;
    *)
      help_message
      return 1
      ;;
  esac
}
" | tee -a ~/.bashrc /home/pi/.bashrc

source ~/.bashrc
source /home/pi/.bashrc

# Change default hostname from 'raspberrypi' to 'iotbox'
echo iotbox | tee /etc/hostname
sed -i 's/\braspberrypi/iotbox/g' /etc/hosts

apt-get update

# At the first start it is necessary to configure a password
# This will be modified by a unique password on the first start of Harpiya
password="$(openssl rand -base64 12)"
echo "pi:${password}" | chpasswd

echo "Acquire::Retries "16";" > /etc/apt/apt.conf.d/99acquire-retries
# KEEP OWN CONFIG FILES DURING PACKAGE CONFIGURATION
# http://serverfault.com/questions/259226/automatically-keep-current-version-of-config-files-when-apt-get-install
xargs apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" install < /home/pi/harpiya/addons/iot_box_image/configuration/packages.txt
apt-get -y autoremove

apt-get clean
localepurge
rm -rfv /usr/share/doc

pip3 install -r /home/pi/harpiya/addons/iot_box_image/configuration/requirements.txt --break-system-package

# Dowload MPD server and library for Six terminals
wget 'https://nightly.harpiya.com/master/iotbox/eftdvs' -P /usr/local/bin/
chmod +x /usr/local/bin/eftdvs
wget 'https://nightly.harpiya.com/master/iotbox/eftapi.so' -P /usr/lib/

# Create Harpiya user for harpiya service and disable password login
adduser --disabled-password --gecos "" --shell /usr/sbin/nologin harpiya

# Replace pi user with harpiya user in sudoers file: harpiya user doesn't need to type its password to run sudo commands
mv /etc/sudoers.d/010_pi-nopasswd /etc/sudoers.d/010_harpiya-nopasswd
sed -i 's/pi/harpiya/g' /etc/sudoers.d/010_harpiya-nopasswd

# Allow "sudo" git commands even if Harpiya directory is owned by harpiya user
git config --global --add safe.directory /home/pi/harpiya

# copy the harpiya.conf file to the overwrite directory
mv -v "/home/pi/harpiya/addons/iot_box_image/configuration/harpiya.conf" "/home/pi/"
chown harpiya:harpiya "/home/pi/harpiya.conf"

groupadd usbusers
usermod -a -G usbusers harpiya
usermod -a -G video harpiya
usermod -a -G lp harpiya
usermod -a -G input lightdm
usermod -a -G input harpiya
usermod -a -G pi harpiya
mkdir -v /var/log/harpiya
chown harpiya:harpiya /var/log/harpiya
chown harpiya:harpiya -R /home/pi/harpiya/

# logrotate is very picky when it comes to file permissions
chown -R root:root /etc/logrotate.d/
chmod -R 644 /etc/logrotate.d/
chown root:root /etc/logrotate.conf
chmod 644 /etc/logrotate.conf

echo "* * * * * rm /var/run/harpiya/sessions/*" | crontab -

update-rc.d -f hostapd remove
update-rc.d -f nginx remove
update-rc.d -f dnsmasq remove

systemctl enable ramdisks.service
systemctl disable dphys-swapfile.service
systemctl enable ssh
systemctl set-default graphical.target
systemctl disable getty@tty1.service
systemctl enable systemd-timesyncd.service
systemctl unmask hostapd.service
systemctl disable hostapd.service
systemctl disable cups-browsed.service
systemctl enable harpiya.service

# ========= BOOT FILE CONFIGURATION =========
# Related documentation:
# https://www.raspberrypi.com/documentation/computers/legacy_config_txt.html
BOOT_CONFIG_FILE="/boot/config.txt"

# disable overscan in /boot/config.txt, we can't use
# overwrite_after_init because it's on a different device
# (/dev/mmcblk0p1) and we don't mount that afterwards.
# This option disables any black strips around the screen
# cf: https://www.raspberrypi.org/documentation/configuration/raspi-config.md
echo "disable_overscan=1" >> ${BOOT_CONFIG_FILE}

# Allow to detect displays after boot
echo "hdmi_force_hotplug=1" >> ${BOOT_CONFIG_FILE} # HDMI output mode will be used, even if no HDMI monitor is detected
echo "​hdmi_force_mode=1" >> ${BOOT_CONFIG_FILE} # Allow forced options below
echo "hdmi_group=0" >> ${BOOT_CONFIG_FILE} # Automatically detect hdmi group
echo "hdmi_mode=16" >> ${BOOT_CONFIG_FILE} # 1080p 60Hz 16:9
echo "hdmi_ignore_edid=0xa5000080" >> ${BOOT_CONFIG_FILE} # safeguard against invalid display EDID

# Use the fkms driver instead of the legacy one (RPI3 requires this)
sed -i '/dtoverlay/c\dtoverlay=vc4-fkms-v3d' ${BOOT_CONFIG_FILE}

# create dirs for ramdisks
create_ramdisk_dir () {
    mkdir -v "${1}_ram"
}

create_ramdisk_dir "/var"
create_ramdisk_dir "/etc"
create_ramdisk_dir "/tmp"
mkdir -v /root_bypass_ramdisks

echo "password"
echo ${password}
