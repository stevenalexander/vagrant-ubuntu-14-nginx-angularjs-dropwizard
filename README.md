# Vagrant Ubuntu 14.04 Puppet Nginx

Simple example showing how to provision a Ubuntu 14.04 Nginx web server hosting a sample AngularJS application VM using Vagrant and Puppet.

Created and tested on Mac OSX 10.9.5, Vagrant 1.6.3, VirtualBox 4.3.6, otherwise using versions/boxes given in VagrantFile and Puppet config.

## Start

```
# Get JS and CSS library resources (AngularJS and Bootstrap) for the site using npm and bower
./update_dependencies.sh
# Starts up VM and runs puppet to setup, downloading box if necessary
vagrant up
# On completion nginx should be running and the AngularJS site accessible from host at http://192.168.33.10
```

## AngularJS

The AngularJS site lives in the site_content puppet module and can be run separately using npm and tested.

```
# run local
./run_local.sh

# test
./run_unit_tests.sh

# e2e protractor tests
./run_e2e_tests.sh
```


## Details

Used [jfryman-nginx](https://forge.puppetlabs.com/jfryman/nginx) v0.1.1 module to puppetize nginx, added using:

```
puppet module install jfryman-nginx  --modulepath puppet/modules
```

I created a custom puppet module site_content (puppet/modules/site_content) which ensures /var/www exists and deploys the AngularJS site.

## Notes

This is a bare bones example and does not include any security or configuration best practise, so do not use in production.

Any change to the puppet files requires you to run 'vagrant provision' to update.

## Possible improvements

* Move the site content under src directory and build RPM with content instead of using explicit puppet module, that way site can be versioned and installed as RPM directly
* HTTPS