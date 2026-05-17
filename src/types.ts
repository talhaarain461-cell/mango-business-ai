/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BoxSize = '5kg' | '10kg' | 'Bulk';

export interface MangoProduct {
  id: string;
  name: string;
  price5kg: number | string;
  price10kg: number | string;
  availableSizes: BoxSize[];
  type: string;
  description: string;
  longDescription?: string;
  specifications?: Record<string, string>;
  status: 'Available' | 'In Stock' | 'Out of Stock' | 'Pre-Order Opening Soon' | 'Coming Soon';
  image: string;
  gallery?: string[];
  lastRateUpdate?: string;
  isFeatured?: boolean;
  featuredBadge?: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  productId: string;
  boxWeight: string;
  paymentMethod: 'Bank Transfer' | 'JazzCash' | 'Easypaisa';
}

export const MANGO_PRODUCTS: MangoProduct[] = [
  {
    id: 'almas',
    name: 'Almas Mango',
    price5kg: 1500,
    price10kg: 2800,
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Prince of Balance',
    description: 'Almas Mango is a Pakistani mango variety that arrives in May during the early mango season. It is known for its mild sweetness, refreshing taste, and soft juicy texture, making it a good choice for fresh eating.',
    longDescription: 'Almas Mango – A Refreshing Start to the Season\n\nAlmas Mango is an early-season Pakistani mango variety grown in the regions of Sindh and Punjab. It usually becomes available in May and is appreciated for its light sweetness and refreshing flavor. Unlike heavily sweet mango varieties, Almas offers a softer and more balanced taste that feels light and pleasant in warm weather.\n\nThe fruit has a soft, smooth, and juicy pulp with low fiber, making it enjoyable for fresh consumption. Its skin remains green in the early stages and gradually turns light yellow when ripe. Almas Mango is commonly eaten fresh and is valued for its natural flavor, smooth texture, and seasonal freshness.\n\nIt is a suitable choice for people who prefer a mango that is not overly sweet and has a clean, refreshing taste during the beginning of the mango season.',
    specifications: {
      'Variety': 'Almas Mango',
      'Taste': 'Mildly sweet and refreshing',
      'Texture': 'Soft, smooth, and juicy',
      'Skin Color': 'Green turning light yellow when ripe',
      'Season': 'May (Early Mango Season)',
      'Regions': 'Sindh and Punjab, Pakistan',
      'Nutritional Value': 'Rich in vitamins and minerals',
      'Best Use': 'Fresh eating'
    },
    status: 'In Stock',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhULI5pKc3gOTA75pftmazdlTJI1IVzr9lHgN3azqI7O0QKdGqULL9N5yWRXAGQcTmbW-fza24ctJvclhSSin4Yu9aHdSa7f78_80QR_trviN1PE1upErTEULatuo1JwWg_lwfPdoTYJmPdARtnlKdVcyMDgy39Up_P4ybsvj7iu5q0KapryQqa-2Os2qA/s800-rw/file_00000000086071faa4a27c1f5ff0f263.png',
    lastRateUpdate: "2026-05-14T10:00:00"
  },
  {
    id: 'saroli',
    name: 'Saroli Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Season Opener Mango',
    description: 'Saroli is one of the earliest mango varieties of the season, known for its soft texture and naturally sweet taste. It offers a refreshing and delightful start to the mango season.',
    longDescription: 'Saroli Mango – A Fresh Start to the Mango Season\n\nSaroli Mango is one of the oldest and most traditional mango varieties grown in Pakistan. It is widely known as the "season opener" because it arrives early and marks the beginning of the mango season.\n\nThis variety is naturally rich in essential vitamins and minerals, making it both nutritious and delicious. Saroli mangoes have green skin that gradually turns slightly yellowish-brown as they ripen. Inside, the pulp is soft, smooth, and juicy, offering a naturally sweet taste with a light and refreshing aroma.\n\nSaroli is highly appreciated for its balanced flavor and tender texture, making it an excellent choice for fresh consumption. Its early availability and pleasant taste make it a favorite among mango lovers who want to enjoy the first mangoes of the season.\n\nSaroli Mango is typically available in early mango season, mainly from May to June, making it one of the first varieties to arrive in the market.',
    specifications: {
      'Variety': 'Saroli Mango',
      'Taste': 'Mildly sweet and refreshing',
      'Texture': 'Soft, smooth, and juicy',
      'Skin Color': 'Green turning light yellow-brown when ripe',
      'Season': 'Early mango season (season starter)',
      'Nutritional Value': 'Rich in vitamins and minerals',
      'Best Use': 'Fresh eating'
    },
    status: 'In Stock',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQkH1-rI21NXeFwY93pQOwto7sXh2kDiAq4MB6NsM6llgcicewJFtQ_dsLtWLvhOOnm7_v5DdehGvRHfNV-qgxepEFmvJWqkZc-er2wrP16jW763JtY0ZcN5ptNGb1jnFMeUr-fdlYlWD1K8SwX4d06P4TYK1FRSPRhiSSM8auxZdAS4OqLdScXnm2u8A/s800-rw/Saroli%20mango-main.png',
    lastRateUpdate: "2025-05-14T10:00:00"
  },
  {
    id: 'desi-achar',
    name: 'Desi Achari Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Raw Pickle Mango (Achar Special)',
    description: 'Desi Achari Mango – Best for Pickle (Achar). Desi Achari Mango is a traditional raw mango mainly used for making pickles. It has a sour taste and strong flavor, perfect for homemade achar.',
    longDescription: 'Desi Achari Mango – Traditional Mango for Pickle Making\n\nDesi Achari Mango is a traditional mango variety in Pakistan. It is not usually eaten fresh because it is raw and sour. It is mainly used for making mango pickle (achar).\n\nThis mango is hard and firm, so it absorbs spices very well. When mixed with salt, oil, and spices, it becomes a tasty and long-lasting pickle that is very popular in desi homes.\n\nDesi Achari Mango is available in the summer season, mostly from May to July, which is the best time for making pickles.\n\nIt is mainly used for:\n\nMango pickle (achar)\nSpicy homemade pickles\nTraditional food preparation',
    specifications: {
      'Variety': 'Desi Achari Mango',
      'Taste': 'Sour (raw mango)',
      'Texture': 'Hard and firm',
      'Season': 'May to July',
      'Main Use': 'Pickle (Achar)'
    },
    status: 'Coming Soon',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-T6eEfXGg295uibQEQwe3pAFALJbrVng_vWPRuR24nj-KGNSxeROseBhxarWajdMjckjEvOPavJix6Wk48p2LMCY-J3OXteY_68zs6ms7aUdZH96O-Y4P9EgnyLjXd50hmxBJUEsFYVl83zq5nPlrqK2FqBwFI1cbmdWWEbdLURep_8g2mdWWBmCnBwQ/s800-rw/Desi%20mango-2.png',
    gallery: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhq4Lfe39N-cbRvtWiRNyUQsHHjo7RrvYr6vU8mric691uxuf19ZTKAgMK81OBjVsVF69zzeBxuMRUNx0EE2I-tm0IbH-I-XwR_JG0CIQ3RpCWFldU4X3WV6P3H24ipRXc3e_WmKZIc5s4I817fhKiApWN5ZIJI_PVVvsvhIjmGxde4C-AgOlAJ5FZUwAk/s800-rw/Desi%20achari%20mango-main.png',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7xvmpaw_Fuiq1LgncPdJOEFtOHmOdF_a8UjxsGVZ_fmnIsBINL7rVQ6JOxAyYVr0RA8iiC9E0ytNfNdBtlwDSJ8gMVmekSrQobFisUYCKDr6sK5JGaQM3udbjwqBK_4CFg9gs-dn3uQ70HlT3s4SPjVK693PtkmgbARyx5DUYWRY4xyZI5jIg4WoCSrc/s800-rw/Desi%20achari%20mangoi-1.png'
    ]
  },
  {
    id: 'sindhri',
    name: 'Sindhri Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Queen of Mangoes',
    description: 'Sindhri Mango – The Queen of Mangoes. Sindhri is a large, sweet, and highly fragrant mango known as the "Queen of Mangoes." It is one of the most popular mango varieties in Pakistan.',
    longDescription: 'Sindhri Mango is one of the most famous mango varieties in Pakistan. It is mainly grown in Sindh, especially in Tando Allahyar and Sindhri areas, which are known for producing high-quality export mangoes.\n\nThis mango is large, oval-shaped, very sweet, and highly fragrant. Because of its rich taste and strong aroma, it is considered one of the best mangoes in the country and is loved all over Pakistan as well as exported internationally.\n\nSindhri Mango is a highly demanded variety and is often called the "Queen of Mangoes" due to its premium taste and quality.\n\nIt is available in the mango season, mainly from May to June.\n\nIt is:\n\nSweet and juicy\nHighly aromatic\nExport quality fruit\nOne of the most popular mangoes in Pakistan',
    specifications: {
      'Variety': 'Sindhri Mango',
      'Taste': 'Very sweet',
      'Texture': 'Soft and juicy',
      'Shape': 'Large and oval',
      'Season': 'May to June',
      'Origin': 'Tando Allahyar, Sindh (Pakistan)',
      'Use': 'Fresh eating & export quality'
    },
    status: 'Coming Soon',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVJ_7SXyQeA3EVHwciuZtLK9vdtKVMUtE82SaOwjpZibVdu7BJA4opnTmYGrQ4AXLvO_efGp8ZxqHFKodM1akPf669S0FIl9eVv3sFFghtEJP6Ro5N5gaMZip9q2INwHcy47vWBP6t5YVpwMTvhYI85KMUeL6cQK8snn43-P0HWC-sZHs3BVJ0X_EI2WM/s800-rw/sindhri-main.png',
    isFeatured: true,
    featuredBadge: 'Most Popular',
    gallery: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZrXdCtEZCWw747N8BRyAmDNFrcN7iSpbxr772To7P15B9LPnVIbII7qkXxr5TPuglvWFhgDzyAhr8jozUQIMQfZDRrzunRUIjfhFIO2iUH5OMNV-W2jaL7p8v1DsP2DlpzLjcRGFl61xPGZ2tcXQXgejafolP9oDIU33C3Uaw1GzTQyEwaw4WLC4Vmk8/s800-rw/sindhri-1.png',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk8Tc1wwFu86khz-VB1kzXjIUuqIxm2Y9pUaTSlFyAO6F83Dfy59OQqnMF5Ym3RaXMXYk_ujbd9WcP3Ujsbzh2-FoOWtNIx0uro00Hb99Ay_t84hWVsTiVYPOmi-F8bO9w-BLfgyb8S8_pKxiGoHk5d3bmg32E8vlZNPep01onjQ7f03V58yJCQf-quPA/s800-rw/sindhri-2.png'
    ]
  },
  {
    id: 'chaunsa',
    name: 'Chaunsa Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'King of Sweetness',
    description: 'Chaunsa Mango – The King of Flavor. Chaunsa is one of the most premium mango varieties, loved for its rich sweetness, smooth texture, and strong aroma. It is a highly demanded mango both locally and internationally.',
    longDescription: 'Chaunsa Mango is a gift from nature, known for its exceptional sweetness, rich nutrition, and smooth texture. Its delicious taste makes it one of the most popular mango varieties in the world.\n\nIt is one of the most exported Pakistani mangoes, widely shipped to Europe, America, and the Middle East due to its high quality and demand.\n\nThe word "Chaunsa" means "to suck," which describes the best way to enjoy it. The ideal method is to gently squeeze the ripe mango until it becomes soft, then open a small hole at the top and enjoy the sweet juice inside.\n\nChaunsa has a low-fiber, smooth pulp, making it very easy and enjoyable to eat.\n\nIn Pakistan, Chaunsa is a late-season mango and is usually available in the last phase of the mango season, mainly from July to August.\n\nThe Chaunsa from Tando Allahyar (Sindh) is especially famous for its premium quality and export standards.\n\nIt is:\n\nVery sweet and juicy\nSmooth and low-fiber\nHighly aromatic\nOne of the top export mangoes',
    specifications: {
      'Variety': 'Chaunsa Mango',
      'Taste': 'Very sweet',
      'Texture': 'Soft and smooth',
      'Season': 'July to August (late season)',
      'Origin': 'Tando Allahyar, Sindh (Pakistan)',
      'Export': 'Europe, USA, Middle East',
      'Use': 'Fresh eating & export quality mango'
    },
    status: 'Coming Soon',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgo-Yv2IdhlUXiTN3m5286-jFbRaQe2PzoYmDQvZmD4uI_B7kT_7NMfqx3RfvbWqsg9t3s6lfdt4g_MXoNPxig5tT4g_tErDJ_UyvuExosbEeVVS1Zi7PNxGnGmQ5B9cNWRHh1KQZk76i5kwU6vEmeq2RV9Ztw3HK3dPfjHu3vz4JGlruF_FYtnqwzgPSY/s800-rw/Chaunsa%20mango-main.png',
    lastRateUpdate: "2025-05-14T10:00:00"
  },
  {
    id: 'anwar-ratol',
    name: 'Anwar Ratol Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Mini Powerhouse Mango',
    description: 'Anwar Ratol Mango – Mini Powerhouse of Sweetness. Anwar Ratol is a small, yellow mango known for its extreme sweetness and smooth, fiberless pulp. It is one of the most loved mango varieties in Pakistan.',
    longDescription: 'Anwar Ratol Mango is a small-sized, yellow mango variety famous for its rich sweetness and soft, fiberless pulp. It is often called a "mini powerhouse" because of its strong natural sweetness in a small fruit.\n\nThis mango is mainly grown in Punjab and Sindh regions of Pakistan and is highly popular due to its unique taste and smooth texture.\n\nAnwar Ratol is extremely sweet, juicy, and melts easily in the mouth. It is best enjoyed fresh when fully ripe. Because of its low fiber content, it is very smooth and easy to eat.\n\nThis mango is available in the mid mango season, mainly from June to July.\n\nIt is:\n\nVery sweet and juicy\nSmooth and fiberless\nSmall in size but rich in taste\nOne of the most popular premium mangoes in Pakistan',
    specifications: {
      'Variety': 'Anwar Ratol Mango',
      'Taste': 'Extremely sweet',
      'Texture': 'Soft and fiberless',
      'Shape': 'Small and round',
      'Season': 'June to July',
      'Origin': 'Punjab & Sindh (Pakistan)',
      'Use': 'Fresh eating premium mango'
    },
    status: 'Coming Soon',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOqy37aB5kFHk2Gdz3ksqFpjm9Jv-He4NoQGmVNhvYF43grLGIs9yhMFDx8xv5aHbKzMyet2M8mQ4hQE82bsPLom-rDjlAGwf_stKKnvd_INJF3Hm6lbznoXJVjmJ53Sifzuu8-OUkxYH-KWPmK890We-o0o49qoBuw64nRmZ4Sps_fgAa8kuZBJG8ud0/s800-rw/Anwar%20ratol-main.png',
    lastRateUpdate: "2025-05-14T10:00:00",
    gallery: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmr6VtQBmAt_6mbDuzfYCbjELVUSoJ_FikOgZm-l9O0GF7zBHC1vhGxj_g2J7lX4nhF4d4cv3Ne9mWp7zljgkngpPiig3JUvaaecx2PbCz1cRaLyG-nZcoK6L-_Al_uNQlXq7H1fJN0xXekQRl2HT3ozXsAVxwjaTVPGxyjG0REH_pOvAJO8gnI6n2Gx8/s800-rw/Anwar%20ratol-2.png',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBmsVbG5INenM5N49YgyzjApZhYqQ179kGLLB6d3H7YHi0pvaQ3Yll1oTXkKrgiCDcfRXcjWX_ryUz9DAeN0Sq0xyArYt3TEXbjRzaGVh3E_kP6-MHokz72P4IKvcMzYyyGXSIksBvA1HbAHBP5xUkfGEoqS_2qISaqY7MVXkLQL32VS0dSXUx9vm3mbY/s800-rw/Anwar%20ratol-1.png'
    ]
  },
  {
    id: 'dasheri',
    name: 'Dasheri Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Classic Summer Mango',
    description: 'Dasheri Mango – Sweet & Juicy Summer Delight. Dasheri Mango is a popular summer fruit known for its sweet taste, smooth texture, and juicy pulp. It is a refreshing and healthy mango variety loved by everyone.',
    longDescription: 'Dasheri Mango is one of the most loved mango varieties in South Asia, known for its rich sweetness and soft, smooth flesh. It is a valuable summer fruit enjoyed for its delicious taste and refreshing juice.\n\nThis mango is also known by different regional names such as Dasheri, Dashari, and Desheri. It is widely grown and enjoyed across Pakistan and India.\n\nDasheri Mango is rich in fiber, which helps support digestion. It is also a good source of Vitamin C, which helps strengthen the immune system. In addition, it contains important nutrients like Vitamin A, Vitamin E, iron, calcium, folate, zinc, and other minerals that support overall body health.\n\nThe skin of Dasheri Mango also contains natural antioxidants that may help reduce inflammation and support good health.\n\nDasheri Mango is available in the summer season, mainly from June to July. It is best enjoyed fresh when fully ripe, offering a sweet, juicy, and aromatic flavor.\n\nIt is:\n\nVery sweet and juicy\nSoft and smooth in texture\nHealthy and nutrient-rich\nA classic summer mango variety',
    specifications: {
      'Variety': 'Dasheri Mango',
      'Taste': 'Sweet and aromatic',
      'Texture': 'Soft and juicy',
      'Shape': 'Medium and oval',
      'Season': 'June to July',
      'Nutritional Value': 'Rich in fiber, Vitamin C, Vitamin A, iron, calcium, folate, zinc',
      'Benefits': 'Supports digestion and immunity',
      'Use': 'Fresh eating summer fruit'
    },
    status: 'In Stock',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2Q0QsmytjCz69nqBhOODrcgOfnRLZbHu6WqPepVzZCIlooiohFAqV9oEJU8W8hAdXgmTyuoVRK9EdvQt0ievaPSfuyxoArOzBXwKnaHgmuzDzOY9gpIyUX-Wm-Sf1G7yj_8cNTXLad3MZldeuFz6Bta-LZHL3czUS1J_DiFPIz5eUZFVaFCEWOayz2pw/s800-rw/Dasheri%20mango-1.png',
    lastRateUpdate: "2025-05-14T10:00:00",
    gallery: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3_iVcoT6ROPVEio0O3Oj9fVIEuwpRDBtv1exDYf1wAVgFvrlYGbVlBdvlsUWvaU9ttSHBRapXHXgpGrnyZsL8CVk5PEHwkf5QKbPtfhbdVyx1SzRFDX7aWfXMliZLamHoKUoicZewcU86PZ_Vv3GRfHWNmSmUsEIawnmU0c3Z73sX1nG7lgqhDAdtNJA/s800-rw/Dasheri%20mango-main.png',
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEglTSO0evg1vvhXcxbzEXB4V2MT-nrKc05Ix-XQsIi6nTjjoQqg1rHI3R0OFVIkdxflAMIPqy50zvyuqhrZ1Cj4UtGWuLvPhH-CieE6Nmcw5wFLxxhdPl-if5Pek08ha_T_b-Q_0CyfKGkVeokZd0orKuZgXQkrWBHVj0J2PigRHFitT11MotTR77mdRE4/s800-rw/Dasheri%20image-2.png'
    ]
  },
  {
    id: 'langra',
    name: 'Langra Mango',
    price5kg: 'N/A',
    price10kg: 'N/A',
    availableSizes: ['5kg', '10kg', 'Bulk'],
    type: 'Aromatic Juicy Mango',
    description: 'Langra Mango – Juicy & Aromatic Summer Delight. Langra Mango is a highly juicy, sweet, and aromatic mango known for its rich flavor and smooth texture. It is loved worldwide for its natural taste and freshness.',
    longDescription: 'Langra Mango is one of the most famous mango varieties from Pakistan. Its name "Langra" means "lame," and it is widely known for its traditional value and unique identity.\n\nThis mango is available in the summer season, mainly from May to July. It is greenish in color and ranges from medium to large size. Its shape is usually slightly oval and natural.\n\nLangra Mango has a rich, juicy pulp with a strong aroma and sweet taste. It is less intensely sweet compared to some other varieties, which makes it especially popular among international customers.\n\nIt is carefully handled during harvesting and packing to maintain its natural freshness, shape, and quality for export markets around the world.\n\nLangra Mango is:\n\nVery juicy and aromatic\nMedium to large in size\nGreenish skin with yellowish pulp when ripe\nFamous for its natural and balanced sweetness\nOne of the most popular export mangoes',
    specifications: {
      'Variety': 'Langra Mango',
      'Taste': 'Sweet and aromatic',
      'Texture': 'Juicy and soft',
      'Shape': 'Medium to large, slightly oval',
      'Season': 'May to July',
      'Color': 'Greenish turning yellow when ripe',
      'Use': 'Fresh eating & export quality mango',
      'Special Feature': 'Less intense sweetness, international demand'
    },
    status: 'In Stock',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhpfYxZ3DQxr0qLrntZfx0c4NkR8zK8usTpq8nbyir82KH3OuWFzY6qBN2t0ge6dRLMOt8pWyvGVHd95HcceX7nuk8YVL-SRIRVpQoCXBuJX31zSuRCV_AbiZRZJg-uAM4kyG4tXEAOViGpFkcSu8Zmx6xS2HuKFWKKDHRYSwlLClWJW2BrMP3Q522zmio/s800-rw/Langra%20mango-main.png',
    lastRateUpdate: "2025-05-14T10:00:00"
  }
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/1P366h4wni/',
  instagram: 'https://www.instagram.com/aamwalapk',
  tiktok: 'https://www.tiktok.com/@aam.wala?_r=1&_t=ZS-95c0yvCUDTU',
  whatsapp: 'https://api.whatsapp.com/send?phone=923063908181',
  phone: '0306-3908181',
  email: 'aamwalastore@gmail.com'
};