drop database if exists restaurants_mock_data;

create database restaurants_mock_data;
use restaurants_mock_data;

create table if not exists restaurants_data(
	ResID char(3) primary key,
	ResName varchar(255) not null,
    ResRating decimal(2,1),
	ResOpening varchar(255),
    ResClosing varchar(255),
    ResAddress text,
	ResImage text
);

insert into restaurants_data( ResID, ResName, ResRating, ResOpening, ResClosing, ResAddress, ResImage) value
	( '001' , 'KFC Bang Sue' , 4.5 , '09.00AM' , '06.00PM' , '456 Bang Sue, Bangkok, Thailand', 'https://cms-tpq.theparq.com/wp-content/uploads/2020/07/AW_NEW-KFC-LOGO-2019-1024x724.jpg' ),
    ( '002' , 'KFC Central World' , 3.8 , '10.00AM' , '10.00PM' , '388 Pathum Wan, Bangkok, Thailand', 'https://cms-tpq.theparq.com/wp-content/uploads/2020/07/AW_NEW-KFC-LOGO-2019-1024x724.jpg' ),
    ( '003' , 'CoCo Ichibanya LOTUS North Ratchapruek' , 4.2 , '11.00AM' , '08.00PM' , '3017 Ratchapruek Pakkret, Nonthaburi, Thailand', 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2d/cd/6f/dd/caption.jpg' ),
    ( '004' , 'Jiang Noodle LOTUS North Ratchapruek' , 4.8 , '09.00AM' , '06.00PM' , '3017 Ratchapruek Pakkret, Nonthaburi, Thailand', 'https://www.jiangfishballs.com/wp-content/uploads/2022/12/Branch1.png' ),
    ( '005' , 'Santoku Curry' , 3.5 , '09.00AM' , '08.00PM' , '123 Salaya, Nakhon Pathom, Thailand', 'https://img.wongnai.com/p/1920x0/2018/05/22/977838b45fb0467c94c8ac3244c9ef46.jpg' ),
    ( '006' , 'Beef35 Buffet' , 3.5 , '09.00AM' , '08.00PM' , '856 Salaya, Nakhon Pathom, Thailand', 'https://www.ryoiireview.com/upload/article/202309/1695026376_38e29c43c548551805e2cf8549d2ca93.jpg' ),
    ( '007' , 'CoCo Ichibanya Central Pinklao' , 5.0 , '11.00AM' , '08.00PM' , '972 Boromarajonani, Bangkok, Thailand', 'https://media-cdn.tripadvisor.com/media/photo-m/1280/2d/cd/6f/dd/caption.jpg' ),
    ( '008' , 'Yayoi LOTUS Rama IV' , 4.7 , '09.00AM' , '06.00PM' , '569 Rama IV , Bangkok, Thailand', 'https://images.deliveryhero.io/image/fd-th/LH/m7ft-listing.jpg' ),
    ( '009' , 'Kumamura Food.Bar' , 4.5 , '05.00PM' , '12.00AM' , '366 Bang Sue, Bangkok, Thailand', 'https://www.ryoiireview.com/upload/article/202208/1660034492_799bad5a3b514f096e69bbc4a7896cd9.jpg' ),
    ( '010' , 'Teenoi Suki Thonburi Market' , 4.5 , '01.00PM' , '11.00PM' , '222 Boromarajonani, Bangkok, Thailand', 'https://www.ryoiireview.com/upload/article/202305/1683807063_dcaebe457c0b1e29e4e7a073372f5f8c.jpg' ),
    ( '011' , 'Wisdom Central Westgate' , 4.5 , '10.00AM' , '09.00PM' , '875 Bang Yai, Nonthaburi, Thailand', 'https://paikondieow.com/wp-content/uploads/2021/10/0-0-3.jpg' ),
    ( '012' , 'Copper Buffet THE SENSE PINKLAO' , 4.5 , '12.00PM' , '10.00PM' , '777 Boromarajonani, Bangkok, Thailand', 'https://img.wongnai.com/p/1920x0/2021/09/30/1813bbafc5d34ccbbcbc7ec3d5256f90.jpg' )
;
