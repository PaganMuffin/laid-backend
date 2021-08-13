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