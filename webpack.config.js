const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

//para variables de entorno
const Dotenv = require('dotenv-webpack');

//esto es para limpiar los archivos que no usamos
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, "dist"),
        // filename le pone el nombre al archivo final
        // como buenas practicas debemos de optimizar nuestro codigo, por lo que parte de ello es hashear los nombres de los archivos
        filename: "main.js",
        // Esto corresponde al tipo de letra
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: [".js"],
        //Los alias nos serviran para evitar nombres tan largos en nuestros imports y usarlos de una manera mas sencilla
        alias: {
           // '@nombreDeAlias': path.resolve(__dirname, 'src/<directorio>'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        },
    },
    module: {
        rules: [
        {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/, //Cualquier archivo que empiece con extencion m(mjs) o (?) js(JavaScript) lo va a utilizar
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
                loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/ //No se usaran los archivos de node_modules para que no se rompa la aplicacion
        },
        {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.png/,
            type: "asset/resource"
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
                filename: "assets/fonts/[hash][ext]",
            },
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets/images"), //(__dirname, "nom_carpeta", "nom_carpeta_mas_interna")
                to: "assets/images"
            }]
        }),
        new Dotenv(), //checa utils/getData como referenciamos la API
        new CleanWebpackPlugin()
    ],
}