# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "puppetlabs/ubuntu-14.04-64-puppet"
  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provider "virtualbox" do |v|
	v.memory = 256
  end

  # run update to ensure java 7 dependencies are there
  config.vm.provision "shell" do |s|
    s.inline = "sudo apt-get update"
  end

  config.vm.provision "puppet" do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file  = "site.pp"
    puppet.module_path = 'puppet/modules'
  end

end