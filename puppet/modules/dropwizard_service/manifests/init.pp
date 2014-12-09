class dropwizard_service {

  file {
    "/opt/dropwizard-sample":
      ensure => directory;

    "/etc/init/dropwizard-sample.conf":
      source  => "puppet:///modules/dropwizard_service/dropwizard-sample.conf",
      notify  => Service['dropwizard-sample'];

    "/opt/dropwizard-sample/config.yml":
      source  => "puppet:///modules/dropwizard_service/config.yml",
      notify  => Service['dropwizard-sample'];

    "/opt/dropwizard-sample/vagrant-ubuntu-14-nginx-angularjs-dropwizard-standalone.jar":
      source  => "puppet:///modules/dropwizard_service/vagrant-ubuntu-14-nginx-angularjs-dropwizard-standalone.jar",
      notify  => Service['dropwizard-sample'];
  }

  service {
  	"dropwizard-sample":
  	  ensure     => 'running',
  	  enable     => true,
  	  provider   => "upstart",
  	  hasrestart => 'true',
  	  hasstatus  => 'false',
      require    => File['/etc/init/dropwizard-sample.conf'],
  }
}