class site_content {

  file {
    "/var/www":
      ensure => directory;

    "/var/www/index.html":
      source  => "puppet:///modules/site_content/index.html",
      require => Package['nginx'],
      notify  => Service['nginx'];
  }

}