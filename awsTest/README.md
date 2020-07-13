## install
```
composer create-project --prefer-dist laravel/laravel [awsTest]
```

## JavaScript & CSS Scaffolding // https://laravel.com/docs/7.x/frontend
omposer require laravel/ui  // 스케폴딩
php artisan ui vue          // 뷰 사용 + (Please run "npm install && npm run dev" to compile your fresh scaffolding.)
                            // resources/sass/app.scss 생성
npm install                 // 라라벨 Mix 사용
npm run dev                 // webpack.mix.js -> public/css , public/js 컴파일 후 등장

## aws deployTest.pem // devJJH/ssh_key
aws 인스턴스 생성
pem ssh키 발급
ssh -i "deployTest.pem" ubuntu@ec2-18-217-23-133.us-east-2.compute.amazonaws.com // 접속

sudo apt-get update
sudo apt-get install php7.4 wget

sudo apt-get install php7.4 curl php7.4-dom -y // php 확장자 설치
sudo apt-get install php curl git unzip -y
sudo apt-get install php-pear php-fpm php-dev php-zip php-curl php-xmlrpc php-gd php-mysql php-mbstring php-xml libapache2-mod-php -y
sudo apt-get install php7.4-mysql
sudo apt-get install nginx -y
sudo apt-get install composer mysql-server -y

보안그룹 - launch - 그룹아이디 - 인바운드 규칙 추가
깃허브 주소 관리

sudo git clone https://주소주소.주소


## make Tip
php artisan make:middleware CheckAge                          // 미들웨어                     app/Http/Middleware
php artisan make:controller ShowProfile --invokable           // 단일 동작 컨트롤러             app/Http/Controllers/
php artisan make:controller PhotoController --resource        // 리소스 컨트롤러                app/Http/Controllers/
php artisan make:controller API/PhotoController --api         // api용 컨트롤러               app/Http/Controllers/API/
php artisan make:model MyModel                                // 모델 생성                    app/
php artisan make:model MyModel2 --migration                   // 모델 옵션                    app/
php artisan make:migration create_posts_table --create=posts2 // 마이 명 , 생성 테이블 명         database/migrations/
php artisan make:migration create_posts_table3 --table=posts4 // 마이 명 , 사용 테이블 명         database/migrations/
php artisan make:seeder UsersTablesSeeder                     // 시더                         database/seeds/
    artisan db:seed --class=UsersTablesSeeder                 // 실행