import seeder from "mongoose-seed"

const db = "mongodb://localhost:3000/seeders"

seeder.connect(db, function () {
    seeder.loadModels( modelPaths: [
        "/models/wisdom"
    ])
})