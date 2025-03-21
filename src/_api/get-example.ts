interface GetExampleQuery {
  exampleId: string
}

export async function getExample({ exampleId }: GetExampleQuery) {
  /* 
    💡 Aqui você pode fazer sua operação no banco de dados
    ou serviço utilizado da sua preferência.
  */

  console.log(exampleId)
}
