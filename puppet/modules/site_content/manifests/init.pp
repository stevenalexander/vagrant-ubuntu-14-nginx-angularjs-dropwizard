class site_content {

  file {
    "/var/www":
      ensure  => directory,
      source  => "puppet:///modules/site_content/app",
      recurse => true,
      require => Package['nginx'],
      notify  => Service['nginx'],
  }

}