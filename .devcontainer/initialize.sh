#!/bin/bash

# Install basic development tools
apt update && apt install -y less man-db sudo locales

sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen