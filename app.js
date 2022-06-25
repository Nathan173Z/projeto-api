const express = require('express');
const app = express();
const categories = require('./models/categories');
// require('dotenv').config();
const port = 3033;




app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", function (request, response) {
    response.send("Serviço API Rest iniciada...");
})


app.get("/categories", async (req, res) =>{
    await categories.findAll({
        attributes: ['name','id','description'],
        order:[['name','ASC']]

    })
    .then( (categories) =>{
        return res.json({
            erro:false,
            categories
        });
    }).catch( (err) => {
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: ${err} ou Nenhuma categoria encontrada`
        })
    })
    
})

app.get('/categorias/:id', async (req, res) =>{
    
    const {id} = req.params;
    try{
        const categorias = await categories.findByPk(id);
        if(!categorias){
            return res.status(400).json({
                erro:true,
                mensagem: "Erro: Nenhuma categoria encontrada"
            })
        }
        res.status(200).json({
            erro:false,
            categorias
        })
    } catch (err) {
        res.status(400).json({
            erro:true,
            mensagem: `Erro: ${err}`
        })
    }
})

app.post("/categories", async (req, res) =>{
    const {name, id,  description } = req.body;
    await categories.create(req.body)
    .then( ()=>{
        return res.json({
            erro:false,
            mensagem: 'Categoria cadastrada com sucesso'
        });
    }).catch( (err)=>{
        return res.status(400).json({
            erro:true,
            mensagem: `Erro: Categoria não cadastrada... ${err}`
        })
    })
})

app.put("/category", async (req, res) =>{
    const { id } = req.body;

    await categories.update(req.body, {where: {id}})
    .then(()=> {
        return res.json({
            erro:false,
            mensagem: 'Categoria alterada com sucesso'
        })
    }).catch( (err)=>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: Categoria não alterada ${err}`
        })
    })
})
    
    app.delete("/categorias/:id", async (req, res) => {
        const { id } = req.params;
        await categories.destroy({where: {id}})
        .then(() =>{
            return res.json({
                erro: false,
                mensagem: "Categoria deletada com sucesso"
            });
        }).catch((err) =>{
            return res.status(400).json({
                erro:true,
                mensagem: `Erro: ${err} Categoria não deletada`
            })
        })
    })




    
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port} http://localhost:${port}`)});

