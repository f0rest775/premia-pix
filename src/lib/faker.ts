interface Pessoa {
  nome: string;
  email: string;
  cpf: string;
}

const nomes: string[] = [
  'ANDREA', 'ADRIANA', 'ISABELA', 'SIMONE', 'KARLA', 'MARCIA', 'SILVIA', 'FABIANA', 'ROBERTO', 'LUIZ', 'HUGO', 'JORGE', 'NATÁLIA', 'ALEXANDRE', 'GUILHERME', 'VITOR', 'DIOGO', 'MARCOS', 'JULIANO', 'VANESSA', 'CRISTINA', 'ALINE', 'RITA', 'CAMILA', 'TERESA', 'SUSANA', 'ANA PAULA', 'GUSTAVO', 'LUIZA', 'JONATHAN', 'PAULO CESAR', 'ADRIANO', 'WILLIAN', 'RENATO', 'FLÁVIA', 'JULIA', 'LUIS', 'FABIANO', 'EDSON', 'RUBENS', 'ANTONIO', 'PAULA', 'PAULO', 'LUCIANO', 'DANILO', 'MARCELLO', 'SANDRA', 'TATIANA', 'RAUL', 'FÁBIO', 'VANESSA', 'ALBERTO', 'RENAN', 'MAYARA', 'MARILENE', 'TANIA', 'ALESSANDRO', 'JOSÉ CARLOS', 'MARIA APARECIDA', 'ANDREI', 'VALÉRIA', 'SILVIO', 'VICTOR', 'KELLY', 'THAIS', 'LUCIANA', 'PAULINA', 'FRANCISCA', 'TAYNÁ', 'ALICE', 'RAFAELA', 'DIEGO', 'SÉRGIO', 'SAMUEL', 'LUANA', 'FELIPE', 'LUCIANA', 'MARCOS VINÍCIUS', 'LETÍCIA', 'ALINE', 'MAURÍCIO', 'KÁTIA', 'MÁRCIA', 'FELIPE', 'PAULO HENRIQUE', 'ROBERTO CARLOS', 'MARTA', 'ARTHUR', 'LARISSA', 'LUCAS', 'FLÁVIO', 'CELSO', 'CAIO', 'TÁCIO', 'ANDERSON', 'WENDY', 'ROGÉRIO', 'ALESSANDRO', 'PAULA', 'VERA', 'ALICE', 'HELOÍSA', 'LÍVIA', 'ANA BEATRIZ', 'RENATA', 'GABRIELA', 'MONIQUE', 'HELENA', 'VÍTOR', 'THALITA', 'SAMARA', 'BETÂNIA', 'MARINA', 'MARISOL', 'PRISCILA', 'FERNANDA', 'JESSICA', 'NATÁLIA', 'CAMILA', 'MAIARA', 'LUCIANA', 'ALISSON', 'SILVANA', 'ROGÉRIO', 'VANESSA', 'GILBERTO', 'STELLA', 'BÁRBARA', 'THAIS', 'ELOÁ', 'BRUNA', 'DANIELA', 'TATIANA', 'ADRIANA', 'VITOR', 'CLÁUDIO', 'VERÔNICA', 'NINA', 'LIVIA', 'DANIEL', 'LILIANA', 'RUTE', 'ANA LÍVIA', 'GUSTAVO', 'MÁRCIO', 'TOMÁS', 'CAMILA', 'THÁSSIA', 'FABIANO', 'GUSTAVO', 'FLÁVIA', 'CLAUDIA', 'MARINA', 'CARLA', 'TIAGO', 'BRUNA', 'PAULA', 'MARIANA', 'MARCOS', 'GILSON', 'PAULA', 'PATRÍCIA', 'IVONETE', 'CINARA', 'MÁRCIO', 'JANAINA', 'FRANCISCO', 'MÁRCIA', 'VILMAR', 'CAROLINA', 'LAÍS', 'MÁRCIO', 'ANDREA', 'ALMIR', 'GEORGE', 'RÔMULO', 'ROBERTO', 'TASSIO', 'FELIPE', 'SÉRGIO', 'ALEX', 'ANDRÉ', 'OLGA', 'KAREN', 'PATRICIA', 'GABRIEL', 'ANA LUIZA', 'RAFAEL', 'THAÍS', 'JÉSSICA', 'LUÍZA', 'MÁRCIA', 'PAULO', 'AMANDA', 'LEANDRO', 'SAMUEL', 'THIAGO', 'TATIANA', 'GUILHERME', 'SILVIA', 'ALDO', 'MATHEUS', 'VANESSA', 'GUSTAVO', 'ALINE', 'MAYARA', 'MARCELO', 'RAFAEL', 'GABRIELA', 'PEDRO', 'CAROLINE', 'NÍSIA', 'LEONARDO', 'PRISCILA', 'SIMONE', 'BÁRBARA', 'JOSÉ', 'LUIZ', 'MONIQUE', 'LETÍCIA', 'RAQUEL', 'VERA', 'ALÉSSANDRA', 'JOAO', 'LUCAS', 'GABRIEL', 'MATHEUS', 'PEDRO', 'LUIZ', 'JOSE', 'GUILHERME', 'CARLOS', 'RAFAEL', 'FELIPE', 'BRUNO', 'GUSTAVO', 'PAULO', 'MARCOS', 'LEONARDO', 'VINICIUS', 'DANIEL', 'LUIS', 'THIAGO', 'MATIAS', 'RICARDO', 'ALFREDO', 'ALESSANDRO', 'MARIA', 'ANA', 'JULIA', 'LETICIA', 'LARISSA', 'BEATRIZ', 'JESSICA', 'BRUNA', 'AMANDA', 'GABRIELA', 'LUANA', 'SAMANTA', 'MAYARA', 'SAMARA', 'JAQUELINE', 'RACHEL', 'RAQUEL', 'LUCIA', 'DENISE', 'DANIELA', 'ERICA'
];

const sobrenomes: string[] = [
  'FERREIRA', 'SOUZA', 'MORAES', 'GOMES', 'BARBOSA', 'CUNHA', 'GARCIA', 'MOREIRA',
  'PINHEIRO', 'MENDES', 'FREITAS', 'CAMPOS', 'CARNEIRO', 'TEIXEIRA', 'XAVIER',
  'SILVEIRA', 'SANTANA', 'BORGES', 'DUARTE', 'PEREIRA', 'BAPTISTA', 'COSTA',
  'LIMA', 'RIBEIRO', 'MACHADO', 'TAVARES', 'VIEIRA', 'BASÍLIO', 'COSTA',
  'PIMENTA', 'SALES', 'RODRIGUES', 'TANURI', 'ZANINI', 'MATOS', 'VALENTE', 'BRITO',
  'GOMES', 'PINHEIRO', 'ALMEIDA', 'ROCHA', 'CARDOSO', 'PAIVA', 'GUIMARÃES',
  'MELO', 'LINS', 'BARBOSA', 'CAMPOS', 'ALVAREZ', 'MOTTA', 'AMARAL', 'RIBEIRO',
  'BRAGA', 'FERNANDES', 'LIMA', 'CAVALCANTE', 'CAMPO', 'MAIA', 'PIMENTEL',
  'OLIVEIRA', 'COELHO', 'SOUZA', 'FREITAS', 'SOARES', 'MONTEIRO', 'GARCIA',
  'DIAZ', 'RODRIGUES', 'FERREIRA', 'VIEIRA', 'RAMOS', 'MEDEIROS', 'BRITO', 'LOPES',
  'VILAR', 'CAETANO', 'CASTRO', 'GUILHERME', 'ALVARES', 'LIMA', 'PAULA',
  'CASTRO', 'FREIRE', 'REIS', 'MACEDO', 'ALVIM', 'GOMES', 'BASSO', 'VIEIRA', 'SENA',
  'PONTE', 'LUÍS', 'PINTO', 'MARTINS', 'MACEDO', 'CALDAS', 'ALMEIDA', 'SANTOS', 'BORGES'
]

const emails: string[] = [
  'yahoo.com.br', 'hotmail.com', 'gmail.com', 'bol.com.br',
  'terra.com.br', 'globo.com', 'ig.com.br'
];

function gerarCPF(): string {
  const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  const calcDigito = (digits: number[], peso: number) => {
    const total = digits.reduce((sum, digit, index) => sum + digit * (peso - index), 0);
    const resto = total % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const digito1 = calcDigito(randomDigits, 10);
  const digito2 = calcDigito([...randomDigits, digito1], 11);

  return [...randomDigits, digito1, digito2].join('');
}

function gerarEmail(nome: string, sobrenome: string): string {
  const separadores = ['.', '_', '-', ''];
  const separador = separadores[Math.floor(Math.random() * separadores.length)];
  const dominio = emails[Math.floor(Math.random() * emails.length)];

  return `${nome.toLowerCase()}${separador}${sobrenome.toLowerCase()}@${dominio}`;
}

export function gerarPessoa(): Pessoa {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  const nomeCompleto = `${nome} ${sobrenome}`;

  const email = gerarEmail(nome, sobrenome);
  const cpf = gerarCPF();

  return {
    nome: nomeCompleto,
    email,
    cpf,
  };
}
