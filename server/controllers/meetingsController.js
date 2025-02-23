const Meetings = require('../models/meetings')

async function scheduleMeeting(req, res) {
    
    const { timeDate, companyA, companyB } = req.body

    console.log('companyb', companyB)

    try{
        const timeDateExists = await Meetings.findOne({timeDate, companyA, companyB})
        if(timeDateExists){
            res.status(400).json({message: "Kompanija je zauzeta u izabranom terminu."})
        }

        const newMeeting = new Meetings({
            timeDate: timeDate,
            companyA: companyA,
            companyB: companyB
        })

        await newMeeting.save()

        res.status(200).json({message: "Uspješno ste zakazali sastanak."})

    }catch(err){

    }
}

module.exports = {
    scheduleMeeting
}