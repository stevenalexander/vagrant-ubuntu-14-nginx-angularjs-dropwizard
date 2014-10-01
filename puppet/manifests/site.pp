class { 'nginx': }

nginx::resource::vhost { 'www.example.com':
  www_root => '/var/www/',
}

include site_content