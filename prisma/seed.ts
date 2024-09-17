import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const reviews = [
    { rating: 5, content: "Absolutely love it! The fit is perfect and the material is super soft." },
    { rating: 4, content: "Good quality, but I wish the color was a bit more vibrant." },
    { rating: 5, content: "Exceeded my expectations! Will definitely be buying more in different colors." },
    { rating: 3, content: "It’s comfortable, but the size runs a bit small." },
    { rating: 1, content: "Terrible fit. It was too tight and uncomfortable. Would not recommend." },
    { rating: 4, content: "Great product, but I think it shrank slightly after washing." },
    { rating: 5, content: "Stylish and comfy, perfect for everyday wear." },
    { rating: 4, content: "Really like it, but the stitching could be stronger." },
    { rating: 5, content: "Feels great and fits perfectly, highly recommend!" },
    { rating: 3, content: "It’s okay, not as soft as I expected." },
    { rating: 4, content: "Good quality for the price. Would buy again." },
    { rating: 1, content: "Very disappointed. The material feels cheap, and it tore after the first wash." },
    { rating: 5, content: "This is my second one and I still love it!" },
    { rating: 2, content: "Not a fan of the material, feels a bit rough." },
    { rating: 5, content: "Super comfortable and looks amazing. I get compliments all the time!" },
    { rating: 4, content: "Nice product, but I wish there were more color options." },
    { rating: 1, content: "Horrible quality. It shrank after one wash and became unwearable." },
    { rating: 5, content: "Perfect fit, great material, and looks awesome!" },
    { rating: 4, content: "Pretty good, but it took a while to arrive." },
    { rating: 5, content: "Absolutely perfect! The material is soft, and it feels very durable." },
    { rating: 3, content: "It’s not bad, but the sizing is a little off." },
    { rating: 4, content: "Really good, but I wish the fabric was a bit thicker." },
    { rating: 5, content: "This is exactly what I was looking for, couldn't be happier!" },
    { rating: 4, content: "Good fit and quality, but the color faded slightly after a few washes." },
    { rating: 3, content: "Decent quality but runs smaller than expected." },
    { rating: 5, content: "Fits perfectly and is super comfortable. Would definitely recommend!" },
    { rating: 4, content: "Nice material, but I wish the fit was a bit looser." },
    { rating: 1, content: "Very disappointed. The color bled after the first wash and stained my other clothes." },
    { rating: 5, content: "Super soft and fits great, one of my favorites!" },
    { rating: 4, content: "Overall good quality, but the color wasn’t exactly as shown." },
    { rating: 5, content: "Feels great, looks great, and holds up well after washing." },
    { rating: 3, content: "It’s just okay. Doesn’t feel as premium as I hoped." },
    { rating: 4, content: "Great for the price. Would have given 5 stars if it was a bit softer." },
    { rating: 5, content: "Amazing! Super comfortable and fits like a glove." },
    { rating: 1, content: "Terrible experience. The stitching came undone after only a week of wear." },
    { rating: 5, content: "I wear this all the time. Love the way it feels!" },
    { rating: 4, content: "Very happy with it, but it could be a bit more durable." },
    { rating: 2, content: "Not satisfied. It didn’t fit well, and the material isn’t great." },
    { rating: 5, content: "One of the best purchases I’ve made! Super soft and comfy." },
    { rating: 4, content: "Pretty good overall, but I wish the size was more consistent." },
    { rating: 3, content: "Not bad, but it feels a bit cheap for the price." },
    { rating: 5, content: "Absolutely love it! The quality is fantastic." },
    { rating: 4, content: "Great product, but the sizing is a little tricky." },
    { rating: 3, content: "It’s fine, but I’ve had better for less money." },
    { rating: 5, content: "This is amazing! The fit is perfect, and the fabric is soft and durable." },
    { rating: 4, content: "Overall, I’m happy with it, but the color did fade a bit." },
    { rating: 1, content: "The worst! The fabric feels like plastic and is very uncomfortable." },
    { rating: 3, content: "It’s decent, but I don’t think I would buy it again." },
    { rating: 5, content: "Fits perfectly, feels amazing, and looks even better in person." },
    { rating: 4, content: "Good quality, but the fit is a little snug." },
    { rating: 5, content: "Best one I’ve ever owned! Great for everyday wear." },
    { rating: 2, content: "Not what I expected. The material feels cheap." },
    { rating: 5, content: "Super comfy and stylish! Would definitely buy again." },
    { rating: 4, content: "Pretty good, but the color didn’t match the photos exactly." },
    { rating: 5, content: "Perfect in every way! Can’t wait to buy another." },
    { rating: 3, content: "It’s alright, but nothing special for the price." },
    { rating: 4, content: "I like it, but I wish the fabric was a bit softer." },
    { rating: 5, content: "Incredibly comfortable and stylish. Highly recommend!" },
    { rating: 3, content: "It’s okay, but the size is a little off." },
    { rating: 4, content: "Solid product, but it does run a little small." },
    { rating: 5, content: "Couldn’t be happier! Fits perfectly and feels amazing." },
    { rating: 1, content: "Awful! It started falling apart after the first wash." },
    { rating: 5, content: "Fantastic quality and fit. Will be buying more!" },
    { rating: 4, content: "Overall pretty good, but it’s a bit pricey." },
    { rating: 3, content: "Not bad, but I expected better for the price." },
    { rating: 5, content: "Love everything about it! The fit, the feel, everything." },
    { rating: 4, content: "Very nice, but the fabric could be a little thicker." },
    { rating: 3, content: "It’s okay. The quality isn’t as high as I thought." },
    { rating: 5, content: "Fits like a dream, and the material is top-notch!" },
    { rating: 4, content: "Pretty happy with it, but the size runs a bit large." },
    { rating: 3, content: "It’s alright, but I’ve had better at this price point." },
    { rating: 5, content: "Couldn’t ask for better! Super soft and comfortable." },
    { rating: 4, content: "Good product, but I wish there were more color choices." },
    { rating: 5, content: "Amazing fit and feel. I wear this all the time!" },
    { rating: 2, content: "Not a fan of the material. Feels a bit rough." },
    { rating: 5, content: "Super soft and fits perfectly. Couldn’t be happier!" },
    { rating: 4, content: "Great product, but the color faded slightly." },
    { rating: 5, content: "My new favorite! It’s so comfortable and stylish." },
    { rating: 3, content: "It’s fine, but I expected more for the price." },
    { rating: 4, content: "Nice quality, but I wish it was a bit cheaper." },
    { rating: 5, content: "Best one I’ve ever bought! So comfortable and fits perfectly." },
    { rating: 4, content: "Pretty good overall, but the fabric could be softer." },
    { rating: 3, content: "It’s decent, but I wouldn’t buy it again." },
    { rating: 5, content: "Love it! The quality is amazing and it fits perfectly." },
    { rating: 4, content: "Really nice, but the color was a little off from the pictures." },
    { rating: 3, content: "It’s okay. Nothing special, but it gets the job done." },
    { rating: 5, content: "This is perfect! Fits great and feels so soft." },
    { rating: 4, content: "Good product, but the sizing runs a bit small." },
    { rating: 5, content: "Couldn’t be happier with this! Perfect fit and feel." },
    { rating: 1, content: "Very poor quality. The fabric feels cheap and uncomfortable." },
    { rating: 2, content: "It’s not the worst, but I wouldn’t buy it again. Feels flimsy." },
    { rating: 4, content: "Good, but the size is a little tight around the shoulders." },
    { rating: 5, content: "Love the feel and look. It’s so versatile!" },
    { rating: 1, content: "The fabric started pilling after just a few wears. Very disappointed." },
    { rating: 3, content: "It’s fine, but not as soft or well-made as I was hoping." },
    { rating: 5, content: "Exceeded expectations! It’s perfect for lounging or going out." },
    { rating: 4, content: "Really nice, but I wish the fit was a bit more relaxed." },
    { rating: 1, content: "Extremely uncomfortable and scratchy. Returned it immediately." },
    { rating: 5, content: "Perfect! Fits great and the material is soft and durable." },
    { rating: 3, content: "It’s okay. The style is nice, but it doesn’t feel premium." }
]
  
const products = [
    { name: 'Kreator men\'s T-Shirt',                   photoUrl: 'img/items/kreator.webp',          price: 19.99 },
    { name: 'Mayhem men\'s T-Shirt',                    photoUrl: 'img/items/mayhem.webp',           price: 19.99 },
    { name: 'Guns N\' Roses Long-Sleeve T-shirt',       photoUrl: 'img/items/gunsnroses.webp',       price: 29.99 },
    { name: 'Metallica men\'s T-Shirt',                 photoUrl: 'img/items/metallica_black.webp',  price: 19.99 },
    { name: 'Metallica men\'s T-Shirt',                 photoUrl: 'img/items/metallica_gray.webp',   price: 19.99 },
    { name: 'Trivium Hoodie',                           photoUrl: 'img/items/trivium_hoodie.webp',   price: 59.99 },
    { name: 'Trivium men\'s T-Shirt',                   photoUrl: 'img/items/trivium_tshirt.webp',   price: 19.99 },
    { name: 'Lamb of God men\'s T-Shirt',               photoUrl: 'img/items/lambofgod_tshirt.webp', price: 19.99 },
    { name: 'Alice in Chains men\'s T-Shirt',           photoUrl: 'img/items/aliceinchains.webp',    price: 20.99 },
    { name: 'Bad Omens men\'s T-Shirt',                 photoUrl: 'img/items/badomens.webp',         price: 20.99 },
    { name: 'Slayer football T-Shirt',                  photoUrl: 'img/items/slayer.webp',           price: 20.99 },
    { name: 'Bullet for My Valentine men\'s T-Shirt',   photoUrl: 'img/items/bfmv.webp',             price: 19.99 },
    { name: 'Red Hot Chilli Peppers women\'s T-Shirt',  photoUrl: 'img/items/rhcp.webp',             price: 19.99 },
    { name: 'Deftones women\'s T-Shirt',                photoUrl: 'img/items/deftones.webp',         price: 19.99 },
    { name: 'Nirvana women\'s T-Shirt',                 photoUrl: 'img/items/nirvana.webp',          price: 19.99 },
    { name: 'Avenged Sevenfold men\'s T-Shirt',         photoUrl: 'img/items/a7x.webp',              price: 19.99 },
    { name: 'Pink Floyd men\'s T-Shirt',                photoUrl: 'img/items/pinkfloyd.webp',        price: 18.99 },
    { name: 'Fleshgod Apocalypse men\'s T-Shirt',       photoUrl: 'img/items/fleshgod.webp',         price: 20.99 },
    { name: 'AC/DC Hoodie',                             photoUrl: 'img/items/acdc_hoodie.webp',      price: 49.99 },
    { name: 'AC/DC men\'s T-shirt',                     photoUrl: 'img/items/acdc_tshirt.webp',      price: 18.99 },
    { name: 'Arch Enemy men\'s T-shirt',                photoUrl: 'img/items/archenemy.webp',        price: 20.99 },
    { name: 'Burzum men\'s T-shirt',                    photoUrl: 'img/items/burzum.webp',           price: 19.99 },
    { name: 'Cradle of Filth Long-Sleeve T-shirt',      photoUrl: 'img/items/cradleoffilth.webp',    price: 27.99 },
    { name: 'Linkin Park men\'s T-shirt',               photoUrl: 'img/items/lp_tshirt.webp',        price: 18.99 },
    { name: 'Linkin Park Hoodie',                       photoUrl: 'img/items/lp_hoodie.webp',        price: 48.99 },
    { name: 'Megadeth men\'s T-Shirt',                  photoUrl: 'img/items/megadeth_tshirt.webp',  price: 19.99 },
    { name: 'Fear Factory men\'s T-Shirt',              photoUrl: 'img/items/fearfactory.webp',      price: 19.99 },
    { name: 'System of a Down men\'s T-Shirt',          photoUrl: 'img/items/soad_tshirt.webp',      price: 19.99 },
    { name: 'System of a Down Hoodie',                  photoUrl: 'img/items/soad_hoodie.webp',      price: 55.99 },
    { name: 'Motorhead Hoodie',                         photoUrl: 'img/items/motorhead_hoodie.webp', price: 54.99 },
    { name: 'Motorhead men\'s T-Shirt',                 photoUrl: 'img/items/motorhead_tshirt.webp', price: 19.99 },
    { name: 'Dimmu Borgir men\'s T-Shirt',              photoUrl: 'img/items/dimmuborgir.webp',      price: 20.99 },
    { name: 'Pantera women\'s T-Shirt',                 photoUrl: 'img/items/pantera.webp',          price: 19.99 },
    { name: 'Epica women\'s T-Shirt',                   photoUrl: 'img/items/epica.webp',            price: 19.99 },
    { name: 'Death men\'s T-Shirt',                     photoUrl: 'img/items/death.webp',            price: 19.99 },
    { name: 'Powerwolf men\'s T-Shirt',                 photoUrl: 'img/items/powerwolf.webp',        price: 19.99 },
    { name: 'Cannibal Corpse Long-Sleeve T-shirt',      photoUrl: 'img/items/cannibal.webp',         price: 26.99 },
    { name: 'Mastodon men\'s T-Shirt',                  photoUrl: 'img/items/mastodon_tshirt.webp',  price: 19.99 },
    { name: 'Gojira men\'s T-Shirt',                    photoUrl: 'img/items/gojira_tshirt.webp',    price: 19.99 },
    { name: 'Korn Long-Sleeve T-shirt',                 photoUrl: 'img/items/korn_men.webp',         price: 27.99 },
    { name: 'Korn women\'s T-Shirt',                    photoUrl: 'img/items/korn_women.webp',       price: 18.99 },
    { name: 'Parkway Drive men\'s T-Shirt',             photoUrl: 'img/items/parkway.webp',          price: 19.99 },
    { name: 'Jinjer men\'s T-Shirt',                    photoUrl: 'img/items/jinjer_tshirt.webp',    price: 20.99 },
    { name: 'Jinjer Hoodie',                            photoUrl: 'img/items/jinjer_hoodie.webp',    price: 59.99 },
    { name: 'Opeth men\'s T-Shirt',                     photoUrl: 'img/items/opeth.webp',            price: 19.99 },
    { name: 'Ozzy Osbourne Hoodie',                     photoUrl: 'img/items/ozzy_hoodie.webp',      price: 52.99 },
    { name: 'Ozzy Osbourne men\'s T-Shirt',             photoUrl: 'img/items/ozzy_tshirt.webp',      price: 21.99 },
    { name: 'Sleep Token men\'s T-Shirt',               photoUrl: 'img/items/sleeptoken_black.webp', price: 20.99 },
    { name: 'Sleep Token men\'s T-Shirt',               photoUrl: 'img/items/sleeptoken_green.webp', price: 20.99 },
    { name: 'Deep Purple men\'s T-Shirt',               photoUrl: 'img/items/deeppurple.webp',       price: 18.99 },
    { name: 'Disturbed men\'s T-Shirt',                 photoUrl: 'img/items/disturbed_tshirt.webp', price: 19.99 },
    { name: 'Eluveitie men\'s T-Shirt',                 photoUrl: 'img/items/eluveitie.webp',        price: 19.99 },
    { name: 'Architects men\'s T-Shirt',                photoUrl: 'img/items/architects.webp',       price: 19.99 },
    { name: 'Mushroomhead men\'s T-Shirt',              photoUrl: 'img/items/mushroom.webp',         price: 19.99 },
    { name: 'Rise Against men\'s T-Shirt',              photoUrl: 'img/items/riseagainst.webp',      price: 19.99 },
    { name: 'Deicide Long-Sleeve T-shirt',              photoUrl: 'img/items/deicide.webp',          price: 30.99 },
    { name: 'Black Label Society men\'s T-Shirt',       photoUrl: 'img/items/bls.webp',              price: 19.99 },
    { name: 'Judas Priest men\'s T-Shirt',              photoUrl: 'img/items/judas_tshirt.webp',     price: 19.99 },
    { name: 'Death Angel women\'s T-Shirt',             photoUrl: 'img/items/deathangel.webp',       price: 19.99 },
    { name: 'Accept men\'s T-Shirt',                    photoUrl: 'img/items/accept.webp',           price: 19.99 },
    { name: 'Pink Floyd men\'s T-Shirt',                photoUrl: 'img/items/pinkfloyd2.webp',       price: 18.99 },
    { name: 'Amaranthe men\'s T-Shirt',                 photoUrl: 'img/items/amaranthe.webp',        price: 19.99 },
    { name: 'Dimmu Borgir men\'s T-Shirt',              photoUrl: 'img/items/dimmuborgir2.webp',     price: 20.99 },
    { name: 'Behemoth men\'s T-Shirt',                  photoUrl: 'img/items/behemoth.webp',         price: 20.99 },
    { name: 'Behemoth men\'s T-Shirt',                  photoUrl: 'img/items/behemoth2.webp',        price: 20.99 },
    { name: 'Alestorm men\'s T-Shirt',                  photoUrl: 'img/items/alestorm.webp',         price: 19.99 },
    { name: 'Type O Negative men\'s T-Shirt',           photoUrl: 'img/items/type.webp',             price: 19.99 },
    { name: 'Thy Art Is Murder men\'s T-Shirt',         photoUrl: 'img/items/thyart.webp',           price: 19.99 },
    { name: 'Sum41 men\'s T-Shirt',                     photoUrl: 'img/items/sum41.webp',            price: 19.99 },
    { name: 'Skindred men\'s T-Shirt',                  photoUrl: 'img/items/skindred.webp',         price: 19.99 },
    { name: 'Sabaton men\'s T-Shirt',                   photoUrl: 'img/items/sabaton_men.webp',      price: 19.99 },
    { name: 'Sabaton women\'s T-Shirt',                 photoUrl: 'img/items/sabaton_women.webp',    price: 19.99 },
    { name: 'Queen men\'s T-Shirt',                     photoUrl: 'img/items/queen_tshirt.webp',     price: 18.99 },
    { name: 'Rage Against the machine Hoodie',          photoUrl: 'img/items/ratm_hoodie.webp',      price: 54.99 },
    { name: 'Rage Against the machine men\'s T-Shirt',  photoUrl: 'img/items/ratm_tshirt.webp',      price: 19.99 },
    { name: 'Overkill men\'s T-Shirt',                  photoUrl: 'img/items/overkill.webp',         price: 19.99 },
    { name: 'My Chemical Romance men\'s T-Shirt',       photoUrl: 'img/items/mcr.webp',              price: 19.99 },
    { name: 'Machine Head men\'s T-Shirt',              photoUrl: 'img/items/machinehead.webp',      price: 20.99 },
    { name: 'Lacuna Coil women\'s T-Shirt',             photoUrl: 'img/items/lacuna_women.webp',     price: 18.99 },
    { name: 'Lacuna Coil men\'s T-Shirt',               photoUrl: 'img/items/lacuna_men.webp',       price: 20.99 },
    { name: 'I Prevail Hoodie',                         photoUrl: 'img/items/iprevail_hoodie.webp',  price: 54.99 },
    { name: 'I Prevail men\'s T-Shirt',                 photoUrl: 'img/items/iprevail_tshirt.webp',  price: 20.99 },
    { name: 'DevilDriver men\'s T-Shirt',               photoUrl: 'img/items/dd_tshirt.webp',        price: 21.99 },
    { name: 'Children Of Bodom men\'s T-Shirt',         photoUrl: 'img/items/children.webp',         price: 21.99 },
    { name: 'Iron Maiden men\'s T-Shirt',               photoUrl: 'img/items/ironmaiden.webp',       price: 19.99 },
    { name: 'Iron Maiden men\'s T-Shirt',               photoUrl: 'img/items/ironmaiden2.webp',      price: 19.99 },
    { name: 'Satyricon men\'s T-Shirt',                 photoUrl: 'img/items/satyricon.webp',        price: 19.99 },
    { name: 'Dark Tranquility men\'s T-Shirt',          photoUrl: 'img/items/darktranquility.webp',  price: 21.99 },
    { name: 'DragonForce men\'s T-Shirt',               photoUrl: 'img/items/dragonforce.webp',      price: 18.99 },

    { name: 'AC/DC Beanie',                             photoUrl: 'img/items/acdc_hat.webp',         price: 14.99, sizes: [] },
    { name: 'Judas Priest Beanie',                      photoUrl: 'img/items/judas_hat.webp',        price: 15.99, sizes: [] },
    { name: 'Slipknot Cap',                             photoUrl: 'img/items/slipknot_cap.webp',     price: 15.99, sizes: [] },
    { name: 'Tool Cap',                                 photoUrl: 'img/items/tool_cap.webp',         price: 15.99, sizes: [] },
    { name: 'Mastodon Cap',                             photoUrl: 'img/items/mastodon_cap.webp',     price: 14.99, sizes: [] },
    { name: 'Megadeth Cap',                             photoUrl: 'img/items/megadeth_cap.webp',     price: 14.99, sizes: [] },
    { name: 'Lamb of God Beanie',                       photoUrl: 'img/items/lambofgod_hat.webp',    price: 14.99, sizes: [] },
    { name: 'Disturbed Beanie',                         photoUrl: 'img/items/disturbed_hat.webp',    price: 14.99, sizes: [] },
    { name: 'Queen Beanie',                             photoUrl: 'img/items/queen_beanie.webp',     price: 14.99, sizes: [] },
    { name: 'DevilDriver Cap',                          photoUrl: 'img/items/dd_cap.webp',           price: 15.99, sizes: [] },
    { name: 'Gojira Cap',                               photoUrl: 'img/items/gojira_cap.webp',       price: 14.99, sizes: [] }
]

async function main() {
    await prisma.user.upsert({
        where: {
            email: 'test@theheavyshop.com',
        },
        update: {

        },
        create: {
            email: 'test@theheavyshop.com',
            name: 'Test Account',
            password: bcrypt.hashSync('password', 10),
            favorites: {
                create: {
                    items: {
                        create: []
                    }
                },
            },
            cart: {
                create: {
                    entries: {
                        create: []
                    }
                },
            },
        },
    })

    for (let i = 1; i <= 99; i++) {
        await prisma.user.create({
            data: {
                createdAt: faker.date.recent({ days: 30 }),
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: bcrypt.hashSync('password', 10),
                photoUrl: faker.image.avatarGitHub(),
                favorites: {
                    create: {
                        items: {
                            create: []
                        }
                    },
                },
                cart: {
                    create: {
                        entries: {
                            create: []
                        }
                    },
                }
            }
        })
    }

    for (const product of products) {
        const n = faker.number.int({ min: 0, max: 20 })
        const template = () => {
            const index = faker.number.int({ min: 0, max: 99 })
            return {
                createdAt: faker.date.recent({ days: 30 }),
                updatedAt: faker.date.recent({ days: 30 }),
                rating: reviews[index].rating,
                content: reviews[index].content,
                verified: faker.datatype.boolean(),
                authorId: faker.number.int({ min: 2, max: 100 })
            }
        }
        
        let itemReviews = []
        for (let j = 1; j <= n; j++)
            itemReviews.push(template() as any)

        await prisma.item.create({
            data: {
                name: product.name,
                description: `Officially licensed ${product.name} featuring an exclusive, high-quality design. Crafted with premium materials for superior comfort and durability.`,
                price: product.price,
                photoUrl: product.photoUrl,
                reviews: {
                    create: itemReviews
                },
                sizes: (product as any).sizes ? (product as any).sizes : ['S', 'M', 'L', 'XL', '2XL']
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
    