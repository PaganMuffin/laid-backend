Baza danych schemat

## table urls

id:uuid user_id:uuid short:text cda_id:text allow_dl:boolean partner:boolean
```
create table quest_urls (
    id uuid default uuid_generate_v4(),
    short text not null,
    cda_id text not null,
    primary key (id)
);

create table user_urls (
    id uuid default uuid_generate_v4(),
    user_id uuid references auth.users,
    short text not null,
    cda_id text not null,
    primary key (id)
);

```


## table anylitics

id:uuid short:"fk short_urls text" views:bigint download:bigint 

## table users

id:"fk auth.users uuid" role:smallint 


CREATE KEYS 

https://api.countapi.xyz/create?namespace=NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3&key=cda-gen-player&enable_reset=1
https://api.countapi.xyz/create?namespace=NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3&key=cda-gen-json&enable_reset=1
https://api.countapi.xyz/create?namespace=NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3&key=db-read-player&enable_reset=1
https://api.countapi.xyz/create?namespace=NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3&key=db-read-json&enable_reset=1
https://api.countapi.xyz/create?namespace=NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3&key=db-entries