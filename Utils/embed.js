var CreatedDate = new Date(1673158140 * 1000)
CreatedDate = CreatedDate.toString()
const CYear = CreatedDate.slice(11, 15)

var CurrentDate = new Date(Date.now())
CurrentDate = CurrentDate.toString()
const CurYear = CurrentDate.slice(11, 15)

const FooterEmbeds = [
    [
        `©${CYear}-${CurYear} • Miosha • nekorin727`
    ],
    [
        'https://cdn.discordapp.com/attachments/1084083962684641354/1206842167738372106/20240213_125938_0000.png',
        'https://media.discordapp.net/attachments/948615835369472064/1184367209607348244/Miosha-2.png',
        'https://cdn.discordapp.com/attachments/948615835369472064/1184367210018385980/Miosha-3.jpg',
        'https://cdn.discordapp.com/attachments/948615835369472064/1184367428512268318/Miosha-4.jpg',
        'https://cdn.discordapp.com/attachments/948615835369472064/1184368161202655252/Miosha-5.jpg'
    ]
]
/*Footer Embeds
[0] Footer Line 
[1] Footer URL*/
module.exports = (FooterEmbeds)