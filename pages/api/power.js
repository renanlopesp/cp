import axios from 'axios'
import * as cheerio from 'cheerio'

export default function handler(req, res) {
    const info = {
        address: 'https://forum.mir4global.com/rank',
        ranktype: req.query.ranktype,
        worldgroupid: req.query.worldgroupid,
        worldid: req.query.worldid,
        classtype: req.query.classtype,
        searchname: req.query.searchname,
    }

    const fullUrl = `${info.address}?ranktype=${info.ranktype}&worldgroupid=${info.worldgroupid}&worldid=${info.worldid}&classtype=${info.classtype}&searchname=${info.searchname}`

    axios
        .get(fullUrl)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html, {
                xml: {
                    normalizeWhitespace: true,
                },
            })
            const specificPower = []

            $('.list_article').each(function () {
                const name = $(this).children('td:nth(1)').text().trim()
                const guild = $(this).children('td:nth(2)').text().trim()
                const cp = $(this).children('td:nth(3)').text().trim()
                specificPower.push({
                    name,
                    guild,
                    cp,
                })
            })

            res.status(200).json(specificPower)
        })
        .catch((err) => console.log(err))
}
