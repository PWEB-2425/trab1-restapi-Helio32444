const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
   title: 'API de Gestão de Alunos da IPVC',
      version: '1.0.0',
      description: 'Documentação da API de alunos e cursos feita com Express e MongoDB para Trabalho 1 de Programação Web',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor local',
      },
      {
        url: 'mongodb+srv://heliobrito671:Vidanova07.@trabalho1.nlqimeu.mongodb.net/trab1',
        description: 'Servidor em produção',
      },
    ],
    components: {
      schemas: {
        Aluno: {
          type: 'object',
          required: ['nome', 'apelido', 'curso', 'anoCurricular'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID do aluno gerado automaticamente pelo MongoDB',
            },
            nome: {
              type: 'string',
              description: 'Nome do aluno',
            },
            apelido: {
              type: 'string',
              description: 'Apelido do aluno',
            },
            curso: {
              type: 'string',
              description: 'Curso do aluno',
            },
            anoCurricular: {
              type: 'string',
              description: 'Ano curricular do aluno',
            },
            __v: {
              type: 'integer',
              description: 'Controle de versão interno do MongoDB',
            },
          },
          example: {
            _id: '60f6f9d2e1a2c916f8b6b9c4',
            nome: 'João',
            apelido: 'Silva',
            curso: 'Engenharia Informática',
            anoCurricular: 2,
            __v: 0,
          },
        },
        Curso: {
          type: 'object',
          required: ['nome', 'descricao'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID do curso gerado automaticamente pelo MongoDB',
            },
            nome: {
              type: 'string',
              description: 'Nome do curso',
            },
            __v: {
              type: 'integer',
              description: 'Controle de versão interno do MongoDB',
            },
          },
          example: {
            _id: '60f6f9d2e1a2c916f8b6c123',
            nome: 'Engenharia Informática',
            descricao: 'Curso superior de Engenharia Informática',
            __v: 0,
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentação Swagger disponível em http://localhost:3001/api-docs ou em produção em https://trabalho1.nlqimeu.mongodb.net/trab1/api-docs`);
}

module.exports = swaggerDocs;
