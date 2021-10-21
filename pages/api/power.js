import axios from 'axios'
import * as cheerio from 'cheerio'

export default function handler(req, res) {
    const info = {
        address: 'https://forum.mir4global.com/rank',
        ranktype: 1,
        worldgroupid: 2,
        worldid: 101,
        classtype: '',
        searchname: req.query.searchname,
    }

    const fullUrl = `${info.address}?ranktype=${info.ranktype}&worldgroupid=${info.worldgroupid}&worldid=${info.worldid}&classtype=${info.classtype}&searchname=${info.searchname}`

    axios
        .get(fullUrl)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificPower = []

            $('td.text_right>span', html).each(function () {
                const title = $(this).text()

                specificPower.push({
                    title,
                })
            })
            res.status(200).json(specificPower)
        })
        .catch((err) => console.log(err))
}
