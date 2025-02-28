const bcryptjs = require('bcryptjs')
const Company = require('../models/company')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    
    const { company, id, name, address, phone, officialEmail, registrationEmail, password } = req.body;

    try{
        console.log(req.body)
        const existingCompany = await Company.findOne({registrationEmail: registrationEmail})
        if(existingCompany){
            return res.status(400).json({error: "Kompanija sa unesenim e-mailom već postoji. Pokušajte se prijaviti."})
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newCompany = new Company({
            company: company,
            id: id,
            name: name,
            address: address,
            phone: phone,
            officialEmail: officialEmail,
            registrationEmail: registrationEmail,
            password: hashedPassword
        })
        console.log(newCompany)

        await newCompany.save()
        return res.status(201).json({message: "Uspješno ste registrovani."})

    }catch(err){
        return res.status(500).json({error: "Greška prilikom registracije."})
    }
    
}

async function login(req,res){

    const { email, password } = req.body

    try{
        console.log(req.body)
        const comp = await Company.findOne({registrationEmail: email})
        if(!comp){
            return res.status(401).json({error: "Korisnik sa unesenim e-mailom ne postoji."})
        }

        const passwordMatch = await bcryptjs.compare(password, comp.password)
        if(!passwordMatch){
            return res.status(401).json({error: "Neispravna lozinka."})
        }
        
        const token = jwt.sign({ email: comp.email }, 'secret');
        return res.status(200).json({ token });

    }catch(err){
        return res.status(500).json({ error: 'Greška prilikom prijave', err_code: err });
    }
}

module.exports = {
    register,
    login
}

//dobar tutorijal za login i regidtraciju
//https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d