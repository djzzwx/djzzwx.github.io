# Max OSX 为 php7.4 安装 memcached


1. brew install libmemcached 
   
2. brew install zlib
   
3. pecl install memcached
    + libmemcached directory [no] : /usr/local/Cellar/libmemcached/1.0.18_2/
    + zlib directory [no] : /usr/local/Cellar/zlib/1.2.11/ 
    + use system fastlz [no] :
    + enable igbinary serializer [no] :
    + enable msgpack serializer [no] :
    + enable json serializer [no] :
    + enable server protocol [no] :
    + enable sasl [yes] :
    + enable sessions [yes] :

4. 把```extension="memcached.so"```加入```php.ini```(一般会在第3步自动加入)
