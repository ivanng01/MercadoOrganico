<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {

        Product::create([
            'name' => 'Tomate Italiano x kg',
            'description' => 'Tomate Italiano x kg',
            'price' => 5,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474846-300-300?v=638410520043170000&width=800&height=800&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Zanahoria',
            'description' => 'Zanahoria',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/178947-300-300?v=636978561154000000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Limón Acido x kg',
            'description' => 'Limón Acido x kg',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474844-300-300?v=638410519454100000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Cebolla Roja x kg',
            'description' => 'Cebolla Roja x kg',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474842-300-300?v=638410518843130000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Palta Fuerte x Kg',
            'description' => 'Palta Fuerte x Kg',
            'price' => 10,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/475822-300-300?v=638425212559270000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Papa Blanca Yungay x kg',
            'description' => 'Papa Blanca Yungay x kg',
            'price' => 4,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474843-300-300?v=638410519142870000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Cebolla Blanca x kg',
            'description' => 'Cebolla Blanca x kg',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474840-300-300?v=638410518242200000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Papa Amarilla Tumbay',
            'description' => 'Papa Amarilla Tumbay',
            'price' => 7,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/224584-300-300?v=637417663435230000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Papaya x Kg',
            'description' => 'Papaya x Kg',
            'price' => 3,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/475821-300-300?v=638425212236600000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Platano de Seda',
            'description' => 'Platano de Seda',
            'price' => 2,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/243586-300-300?v=637443525048970000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Camote Amarillo x kg',
            'description' => 'Camote Amarillo x kg',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474848-300-300?v=638410520643400000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Brócoli',
            'description' => 'Brócoli',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/178949-300-300?v=636978561166800000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Lechuga Americana FRESCOS Bolsa 300g',
            'description' => 'Lechuga Americana FRESCOS Bolsa 300g',
            'price' => 1,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/180082-300-300?v=637094312389030000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Choclo x un',
            'description' => 'Choclo x un',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/169084-300-300?v=636137851461070000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Papa Blanca',
            'description' => 'Papa Blanca',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/252716-300-300?v=637486736234100000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Zapallo Macre',
            'description' => 'Zapallo Macre',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/178024-300-300?v=636905875673230000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Pimiento Morrón x kg',
            'description' => 'Pimiento Morrón x kg',
            'price' => 5,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474841-300-300?v=638410518548670000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Espinaca Baby FRESCOS Bolsa 150g',
            'description' => 'Espinaca Baby FRESCOS Bolsa 150g',
            'price' => 4,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/249167-300-300?v=637472217893900000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Zapallo Italiano x un',
            'description' => 'Zapallo Italiano x un',
            'price' => 1,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165096-300-300?v=636137790942300000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Ajo Entero',
            'description' => 'Ajo Entero',
            'price' => 15,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165025-300-300?v=636137789863100000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Pepino Holandés FRESCOS x un',
            'description' => 'Pepino Holandés FRESCOS x un',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/215993-300-300?v=637394021377470000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Apio Atado x un',
            'description' => 'Apio Atado x un',
            'price' => 1,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165011-300-300?v=636137789647400000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Granadilla Oxapampa x un',
            'description' => 'Granadilla Oxapampa x un',
            'price' => 0,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/243591-300-300?v=637443525210400000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Palta Fuerte Madura FRESCOS',
            'description' => 'Palta Fuerte Madura FRESCOS',
            'price' => 12,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/274185-300-300?v=637613732966600000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Lechuga Seda Hidropónica FRESCOS Bolsa 200g',
            'description' => 'Lechuga Seda Hidropónica FRESCOS Bolsa 200g',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/427973-300-300?v=638103773267900000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Platano Biscocho FRESCOS',
            'description' => 'Platano Biscocho FRESCOS',
            'price' => 6,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/259981-300-300?v=637523952568970000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Manzana Roja Importada',
            'description' => 'Manzana Roja Importada',
            'price' => 8,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/166023-300-300?v=636137810132000000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Piña Golden x kg',
            'description' => 'Piña Golden x kg',
            'price' => 5,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/178942-300-300?v=636977844380230000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Manzana Royal Gala Importada',
            'description' => 'Manzana Royal Gala Importada',
            'price' => 8,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165904-300-300?v=636137808513200000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Beterraga x un',
            'description' => 'Beterraga x un',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/365447-300-300?v=637862391955600000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Albahaca FRESCOS Bolsa 80g',
            'description' => 'Albahaca FRESCOS Bolsa 80g',
            'price' => 2,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/215897-300-300?v=637393289703330000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Arveja',
            'description' => 'Arveja',
            'price' => 6,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165017-300-300?v=636137789783730000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Platano Isla FRESCOS',
            'description' => 'Platano Isla FRESCOS',
            'price' => 5,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/259980-300-300?v=637523952532200000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Ají Verde',
            'description' => 'Ají Verde',
            'price' => 5,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165002-300-300?v=636137789552330000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Tomate Redondo',
            'description' => 'Tomate Redondo',
            'price' => 5,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/442869-300-300?v=638205752991300000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Cebolla China FRESCOS Bolsa 320g',
            'description' => 'Cebolla China FRESCOS Bolsa 320g',
            'price' => 3,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/249478-300-300?v=637475331454570000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Pera Packhams',
            'description' => 'Pera Packhams',
            'price' => 5,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/171140-300-300?v=636194920238430000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Culantro FRESCOS Bolsa 60g',
            'description' => 'Culantro FRESCOS Bolsa 60g',
            'price' => 1,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/215895-300-300?v=637393289561600000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Blueberries FRESCOS Bandeja 300g',
            'description' => 'Blueberries FRESCOS Bandeja 300g',
            'price' => 8,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/482730-300-300?v=638540041382100000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Vainita Americana',
            'description' => 'Vainita Americana',
            'price' => 5,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/165089-300-300?v=636137790871830000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Blueberries FRESCOS Bandeja 500g',
            'description' => 'Blueberries FRESCOS Bandeja 500g',
            'price' => 14,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/482713-300-300?v=638540040811470000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Mandarina Malvacea',
            'description' => 'Mandarina Malvacea',
            'price' => 3,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/224559-300-300?v=637417662623670000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Espinaca FRESCOS Bolsa 350g',
            'description' => 'Espinaca FRESCOS Bolsa 350g',
            'price' => 4,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/179616-300-300?v=637062382062130000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Poro x un',
            'description' => 'Poro x un',
            'price' => 1,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/243521-300-300?v=637443519206230000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Champiñones Enteros PACCU Bandeja 200g',
            'description' => 'Champiñones Enteros PACCU Bandeja 200g',
            'price' => 6,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/164763-300-300?v=636137786685330000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Tomate Cherry FRESCOS Bandeja',
            'description' => 'Tomate Cherry FRESCOS Bandeja',
            'price' => 6,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/255281-300-300?v=637503318671130000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Melocotón Premium x Kg',
            'description' => 'Melocotón Premium x Kg',
            'price' => 9,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/277199-300-300?v=637626622109430000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Camote Morado x kg',
            'description' => 'Camote Morado x kg',
            'price' => 4,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/474845-300-300?v=638410519747870000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Espárragos Verdes FRESCOS Bandeja 300g',
            'description' => 'Espárragos Verdes FRESCOS Bandeja 300g',
            'price' => 8,
            'stock' => 100,
            'category_id' => 2,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/288766-300-300?v=637696702769600000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Fresa Premium Bandeja 500g',
            'description' => 'Fresa Premium Bandeja 500g',
            'price' => 11,
            'stock' => 100,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => 'https://vivanda.vtexassets.com/arquivos/ids/223003-300-300?v=637411741032200000&width=300&height=300&aspect=true',
            'is_featured' => 0,
        ]);


        Product::create([
            'name' => 'Huevos de Gallina de Campo',
            'description' => 'Huevos frescos de gallinas criadas en libertad, alimentadas con granos naturales.',
            'price' => 12.99,
            'stock' => 100,
            'category_id' => 1,
            'user_id' => 2,
            'request_id' => 1,
            'image_path' => '/huevos_gallina_campo.webp',
            'is_featured' => 1,
        ]);

        Product::create([
            'name' => 'Pan Integral Horneado a Leña',
            'description' => 'Pan artesanal hecho con ingredientes orgánicos, horneado al estilo tradicional con leña.',
            'price' => 14.99,
            'stock' => 75,
            'category_id' => 1,
            'user_id' => 2,
            'request_id' => 1,
            'image_path' => '/pan_integral.webp',
            'is_featured' => 1,
        ]);

        Product::create([
            'name' => 'Plátano Orgánico',
            'description' => 'Plátanos seleccionados, cultivados sin pesticidas y cosechados a mano.',
            'price' => 17.49,
            'stock' => 50,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => '/platano_organico.webp',
            'is_featured' => 1,
        ]);

        Product::create([
            'name' => 'Manzana Roja Orgánica',
            'description' => 'Manzanas frescas, cultivadas de manera orgánica, perfectas para picar o hacer jugo.',
            'price' => 18.49,
            'stock' => 50,
            'category_id' => 9,
            'user_id' => 3,
            'request_id' => 1,
            'image_path' => '/manzana_roja.webp',
            'is_featured' => 1,
        ]);
    }
}
