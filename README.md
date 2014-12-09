# Vagrant Ubuntu 14.04 Puppet Nginx

Simple example showing how to provision a Ubuntu 14.04 Nginx web server VM hosting a sample [AngularJS](https://angularjs.org/) application with [Dropwizard](https://dropwizard.github.io/dropwizard/) web service using [Vagrant](https://www.vagrantup.com/) and [Puppet](https://puppetlabs.com/).

Created and tested on Mac OSX 10.9.5, Vagrant 1.6.3, VirtualBox 4.3.6, otherwise using versions/boxes given in VagrantFile and Puppet config.

Requires:

* [Vagrant](https://www.vagrantup.com/)
* [gradle](http://www.gradle.org/)

This is meant as an example of how to use puppet to provision a web application using multiple components, with nginx handling routing. I plan on building this up into a fully fledged microservice solution.

## Start

```
# Get JS and CSS library resources (AngularJS and Bootstrap) for the site
# using npm and bower and compiles the Dropwizard Application as a fat jar
./update_dependencies.sh

# Starts up VM and runs puppet to setup, downloading box if necessary
vagrant up

# On completion nginx should be running and the AngularJS site accessible
# from host at http://192.168.33.10
```

## Running and testing locally

The AngularJS site lives in the site_content puppet module and can be run using npm and tested.

It uses a config module 'appConfig' held in config.js to hold the web service URL it uses for calling Dropwizard to get Person JSON, so a different config.js file is copied into the app folder depending on whether it is running locally or on VM were it uses an Nginx proxy to route calls. When running locally dropwizard is on http://localhost:8095/api, which will cause cross domain scripting errors unless you run browser with reduced security ("--args --disable-web-security" on Chrome).

```
# run local (requires dropwizard)
./run_local.sh

# test
./run_unit_tests.sh

# e2e protractor tests (requires app and dropwizard running locally)
./run_e2e_tests.sh
```

The Dropwizard application requires [gradle](http://www.gradle.org/) for build

```
# run Dropwizard local
./run_dropwizard_local.sh

# test
gradle test
```

## Puppet details

### Java

Used [puppetlabs-java](https://forge.puppetlabs.com/puppetlabs/java) v1.1.2 module to puppetize installing java, added using:

```
puppet module install puppetlabs-java  --modulepath puppet/modules
```

On the version of ubuntu box I had the java module failed due to missing dependencies and needed to run 'sudo apt-get update' to find them. I added this to the vagrant script using a shell provisioner, though a better solution would be either run in puppet before java class or directly include all packages.

I have created a custom module, dropwizard_service, to copy the dropwizard jar, config and upstart script to the server, then ensure the dropwizard service is running and will restart on changes to the jar or config.

### Nginx

Used [jfryman-nginx](https://forge.puppetlabs.com/jfryman/nginx) v0.1.1 module to puppetize nginx, added using:

```
puppet module install jfryman-nginx  --modulepath puppet/modules
```

I created a custom puppet module site_content (puppet/modules/site_content) which ensures /var/www exists and deploys the AngularJS site.

The manifest site.pp (puppet/manifests/site.pp) configures the nginx module to include a vhost entry for the site content and an upstream proxy to the dropwizard application. It took a while to understand how the nginx module actually works to create nginx conf files, it actually creates ones for both the proxy "nginx::resource::upstream" and the vhost "nginx::resource::vhost", with location entries being added to the vhost conf file.

## Notes

This is a bare bones example and does not include any security or configuration best practise, so do not use in production.

Any change to the puppet files requires you to run 'vagrant provision' to update.

## Possible improvements

* Move the site content under src directory and build RPM with content instead of using explicit puppet module, that way site can be versioned and installed as RPM directly
* Package Dropwizard Application as RPM and install using Puppet for versioning
* HTTPS
* Run node tests as part of gradle build using gradle plugin
* I think the nginx config should not belong in site.pp, rather the module site_content or a different module