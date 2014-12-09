include dropwizard_service

class { "java":
  package => "openjdk-7-jre",
  before  => Class['dropwizard_service'],
}

class { 'nginx': }

nginx::resource::upstream { 'dropwizard_app':
  ensure => present,
  members => ['localhost:8095'],
}

nginx::resource::vhost { 'www.example.com':
  ensure => present,
  www_root => '/var/www/',
}

nginx::resource::location { 'www.example.com_api':
  ensure => present,
  vhost => 'www.example.com',
  location => '/api',
  proxy => 'http://dropwizard_app',
}

include site_content