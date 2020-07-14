## install
```
composer create-project --prefer-dist laravel/laravel [awsTest]
```

## JavaScript & CSS Scaffolding // https://laravel.com/docs/7.x/frontend
```
composer require laravel/ui // 스케폴딩  
php artisan ui vue          // 뷰 사용 + resources/sass/app.scss 생성  
npm install                 // 라라벨 Mix 사용  
npm run dev                 // webpack.mix.js -> public/css , public/js 컴파일 후 등장  
```

## aws deployTest.pem // devJJH/ssh_key
1. AWS
```
aws 인스턴스 생성, 키페어 생성 및 다운로드 // EC2 대시보드 에서도 가능
pem ssh키 발급
ssh -i "deployTest.pem" ubuntu@ec2-18-217-23-133.us-east-2.compute.amazonaws.com // 접속
```

2. SSH / php mysql nginx install
```
sudo apt-get update
sudo apt-get install php7.4 wget
sudo apt-get install php7.4 curl php7.4-dom -y // php 확장자 설치
sudo apt-get install php curl git unzip -y
sudo apt-get install php-pear php-fpm php-dev php-zip php-curl php-xmlrpc php-gd php-mysql php-mbstring php-xml libapache2-mod-php -y // 확장자 ?
sudo apt-get install php7.4-mysql
sudo apt-get install nginx -y
```

3. AWS
```
cd /var/www/html // 여기서 작업
보안그룹 - launch - 그룹아이디 - 인바운드 규칙 추가
  SSH / TCP / 22 / 소스 0.0.0.0/0
  MYSQL/Aurora / TCP / 3306 / 소스유형 : 위치무관 / 소스 0.0.0.0/0
깃허브 주소 관리
```

4. SSH
```
sudo git clone [project]
cd [folder]
sudo apt-get install composer mysql-server -y // php 패키지 매니저
sudo composer install
sudo cp .env.example .env
  -> .env DB 설정필요
```

5. mysql
```
sudo mysql

CREATE database awsTest;
SELECT user, plugin, host from mysql.user;
ALTER user 'root'@'localhost' identified with mysql_native_password by 'secret';
CREATE user 'root'@'%' identified by 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'; // [%] , [192.168.%] , [특정IP] 할당 가능
FLUSH PRIVILEGES;
exit

cd /etc/mysql/mysql.conf.d/
sudo vim mysqld.cnf
  -> bind-address 를 0.0.0.0 으로 변경
sudo service mysql restart
```

6. nginx /   https://laravel.com/docs/7.x/deployment 참고
```
cd /etc/nginx/sites-available/
sudo vim default
  server_name -> 퍼블릭 ip; 변경
  root -> /var/www/html/[project]/public; 변경
  index.php 추가
  charser utf-8; 추가
  =404; -> try_files $uri $uri/ /index.php?$query_string; 변경
  error_page 404 /index.php; 추가

  이것도 추가
  location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
  }
  location ~ /\.(?!well-known).* {
    deny all;
  }

sudo nginx -t
sudo service apache2 status
sudo service apache2 stop
sudo service nginx status
sudo service nginx start

cd /var/www/html/[project]
sudo chown -R www-data:www-data public/
sudo chown -R www-data:www-data storage/
```

7. TEST
```
sudo php artisan key:generate
php artisan migrate
php artisan db:seed
```

## make Tip
```
php artisan make:middleware CheckAge                          // 미들웨어                     app/Http/Middleware  
php artisan make:controller ShowProfile --invokable           // 단일 동작 컨트롤러             app/Http/Controllers/  
php artisan make:controller PhotoController --resource        // 리소스 컨트롤러                app/Http/Controllers/  
php artisan make:controller API/PhotoController --api         // api용 컨트롤러               app/Http/Controllers/API/  
php artisan make:model MyModel                                // 모델 생성                    app/  
php artisan make:model MyModel2 --migration                   // 모델 옵션                    app/  
php artisan make:migration create_posts_table --create=posts2 // 마이 명 , 생성 테이블 명         database/migrations/  
php artisan make:migration create_posts_table3 --table=posts4 // 마이 명 , 사용 테이블 명         database/migrations/  
php artisan make:seeder UsersTablesSeeder                     // 시더                         database/seeds/  
php artisan db:seed --class=UsersTablesSeeder                 // 실행
```