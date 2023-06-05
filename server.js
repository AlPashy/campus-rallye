import express from 'express';
import path from 'path';

const app = express();

const port = 4000;

app.use(express.urlencoded())


app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/login.html"));
    
});

app.post("/index.html", (req, res) => {
    const benutzernamen = req.body.benutzername;
    const passwortn = req.body.passwort;

    if(benutzernamen === 'alper' && passwortn === 'masallah') {
        return res.sendFile(path.resolve("public/index.html"));
    } else if (benutzernamen === 'felix' && passwortn === 'felixistcool') {
        return res.sendFile(path.resolve("public/felix.html"))
    } else {

    }
    res.sendFile(path.resolve("public/login.html"));

   //app.use(express.static('public/index.html'));
});

app.listen(port, () => {
    console.log("app hört auf port", port)
})

 
