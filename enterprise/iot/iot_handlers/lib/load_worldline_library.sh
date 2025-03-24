#!/usr/bin/env bash

sudo mount -o remount,rw /
sudo mount -o remount,rw /root_bypass_ramdisks

PATH_ZIP_LIB=/home/pi/harpiya/addons/hw_drivers/iot_handlers/lib/
PATH_LIB=${PATH_ZIP_LIB}ctep/lib/

curl -sS https://download.harpiya.com/master/posbox/iotbox/worldline-ctepv21_07.zip -o  "${PATH_ZIP_LIB}worldline-ctepv21_07.zip"

if [ -f "${PATH_ZIP_LIB}worldline-ctepv21_07.zip" ]; then
	unzip ${PATH_ZIP_LIB}worldline-ctepv21_07.zip -d ${PATH_ZIP_LIB}
	echo $PATH_LIB > /etc/ld.so.conf.d/worldline-ctep.conf
	sudo cp /etc/ld.so.conf.d/worldline-ctep.conf /root_bypass_ramdisks/etc/ld.so.conf.d/
	ldconfig
	sudo cp /etc/ld.so.cache /root_bypass_ramdisks/etc/ld.so.cache
fi

# For iot box images >= 25_01 there is a user "harpiya" running Harpiya service
# If the user "harpiya" exists since this script is ran under "root" user
# we need to make sure that Worldline files are owned by the "harpiya" user
if id harpiya > /dev/null 2>&1; then
	sudo chown -R harpiya:harpiya "${PATH_ZIP_LIB}"
fi

sudo mount -o remount,ro /
sudo mount -o remount,ro /root_bypass_ramdisks
