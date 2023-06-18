---
title: "Designing & creating schema"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 1
aliases:
    - /universal-data-graph/udg-getting-started/creating-schema/
---

## Creating Data Graph schema in Tyk Dasboard

You can design your Data Graph schema from scratch in Tyk Dashboard. To do that go to **Schema tab** and use the built-in schema editor.

{{< img src="/img/dashboard/udg/getting-started/schema-designer.png" alt="Schema editor" >}}

On the left-hand side some additional actions are available:
- **Schema import** - if you have a `.gql` `.graphql` or `.graphqls` file that you created in an external tool of you choice, you can import it using this button.
- **Hide schema editor** - this will toggle the schema editor on and off if you need more space on your screen to work on [connecting data sources]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource">}}).
- **Search schema** - if your Data Graph schema is large and you need to find a type ot a field quickly, this search button will help you do that. It also has the *Find and replace* option, if you need to do bulk changes in Data Graph schema.
- **Download schema** - this allows you to download current Data Graph schema and store it outside of Tyk Dashboard.
- **Learn more** - open a new tab in your browser and takes you directly to Universal Data Graph documentation.

## Creating Data Graph schema using Tyk Gateway API

In case you don't have access to Tyk Dashboard and you need to use Tyk Gateway API, you will most likely use external tools to design your schema.

Once done, that schema needs to be added to Tyk API Definition. All Data Graph specific configurations are stored in `"graphql"` object insode the Tyk Definition JSON.

```bash
    "graphql": {
        "schema": "type VatInfo {\n  valid: Boolean\n  vat_number: String\n  name: String\n  address: String\n  country_code: String\n}\n\ntype Query {\n  vatcheck(code: String): VatInfo\n}"
    }
```

## Designing Data Graph schema

The first step in configuring a Data Graph in Tyk is to decide which datasources you want to stitch together. Once you've done that, you can start designing your Data Graph.

Because Tyk's Universal Data Graph is using our GraphQL engine, the schema you design has to follow [GraphQL specification](https://spec.graphql.org/October2021/#sec-Type-System).

{{< note success >}}
**Note**  

You can use Tyk Dashboard to design your Data Graph schema. Our GQL schema editor will validate your schema in real-time, highlighting any inconsistencies or problems and give you prompts on how to fix them.

You can also use any external tools you like, save your design with `.gql`, `.graphql` or `.graphqls` extension and import it to Tyk later on.

{{< /note >}}

### Basic Data Graph schema design rules

1. The `query` root operation type must be provided and must be an Object type.

```graphql
type Query {
  default: String
}
```

2. The `mutation` and `subscription` root operation types are optional but they also must be Object types. If you want your Data Graph to be able to perform any editing actions like adding new records, updating the existing records or deleting records, you will need `mutation` root operation in your schema.

```graphql
type Mutation {
  default: String
}

type Subscription {
  newDefault: String
}
```

3. Data Graph schema can have any number of other `Objects` that represent a list of named fields, each of which yield a value of a specific type. For example:

```graphql
type Person {
  name: String
  age: Int
  picture: Url
}
```

4. `Object` fields can accept arguments to specify the value to be returned better. This is especially useful when designing Data Graph 'query' root operations, which should fetch a single data record similar to REST API `GET /pet/{petId}` operation.

```graphql
type Query {
  default(argument: Int): String
}
```

5. Any field can return not just a simple single value like `Int` or `String` but also can refer to another `Object` or an array of `Objects`.

```graphql
type Person {
  name: String
  age: Int
  picture: Url
  pets: [Pet]
}

type Pet {
  petId: Int
  petName: String
  breed: String
}
```

6. Documentation can be added to any `field` and `object` by using standard [GQL descriptions](https://spec.graphql.org/October2021/#sec-Descriptions). In the type system definition language, description strings occur immediately before the definition they describe. Any descriptions you add will be visible in the Data Graph designer playground and the public GQL playground (if you enable it). To learn about all GQL playgrounds available with Tyk go [to read more here]({{< ref "/graphql/graphql-playground">}})

```graphql
"""
Root type for all your query operations
"""
type Query {
  """
  Translates a string from a given language into a different language.
  """
  translate(
    "The original language that `text` is provided in."
    fromLanguage: Language

    "The translated language to be returned."
    toLanguage: Language

    "The text to be translated."
    text: String
  ): String
}
"""
The set of languages supported by `translate`.
"""
enum Language {
  "English"
  EN
  "French"
  FR
  "Chinese"
  CH
}
```

With those very basics of schema design, you should be able to create your first Data Graph schema.

{{< note success >}}
**Note**  
If you use the same field naming conventions in your schema as your data source uses in its response, Universal Data Graph engine will be able to automatically resolve them and parse the information into the correct place in Data Graph response.

It is also possible to rename the fields between your data source and your Data Graph. To know exactly how to do that, take a look at [field mapping documentation]({{< ref "/universal-data-graph/concepts/field_mappings">}})

{{< /note >}}

### Designing Data Graph schema for simple REST API data source

*To illustrate this process, we will use a simple public REST API that allows for [VAT validation](https://www.vatcomply.com/documentation#vat)*

The request to get a response from the REST API looks like this:

```bash
GET https://api.vatcomply.com/vat?vat_number={VAT_NUMBER} HTTP/1.1
```

And the response:

```json
{
  "valid": true,
  "vat_number": "810462783B01",
  "name": "SHELL CHEMICALS EUROPE B.V.",
  "address": "WEENA 00070 3012CM ROTTERDAM",
  "country_code": "NL"
}
```

First step is to decide what the `query` root operation will be and what it will return. A good option could be calling query `vatcheck` since it describes quite well what the operation actually will do. And since it returns information about VAT number, in Data Graph schema we can call it `VatInfo`.

```graphql
type Query {
  vatcheck: VatInfo
}
```

Looking at the REST API endpoint it's obvious that in order to obtain information about a VAT number, that VAT number to check needs to be provided as an argument. That needs to be reflected in `query` operation.

```graphql
type Query {
  vatcheck(code: String!): VatInfo
}
```

{{< note success >}}
**Note**  

The exclamation mark next to `String!` indicates that this is a required argument for the query to work correctly.

{{< /note >}}

Next step is to define `VatInfo` object. This is done based on REST API response structure.

```graphql
type VatInfo {
  valid: Boolean
  vat_number: String
  name: String
  address: String
  country_code: String
}
```

At this point you can add descriptions to each field, so that the documentation of your Data Graph is much more user-friendly. The end result could look like this:

```graphql
type VatInfo {
  "Information about validity of the VAT code"
  valid: Boolean
  "VAT number"
  vat_number: String
  "Official registered company name for the VAT number provided"
  name: String
  "Official registered company address for the VAT number provided"
  address: String
  "Official registered company country for the VAT number provided"
  country_code: String
}

type Query {
  "Returns detailed information about a provided VAT code"
  vatcheck(code: String): VatInfo
}
```

Adding descriptions allows you to create a detailed documentation of your Data Graph, that's later available in the [GQL Playground]({{< ref "/graphql/graphql-playground" >}}). As a result you will see the following in `Playground` tab in Tyk Dashboard:

{{< img src="/img/dashboard/udg/getting-started/data-graph-schema.png" alt="Data Graph Schema" >}}

### Designing Data Graph schema for complex REST API data source

*To illustrate this process, we will use a public [Free Dictionary API](https://dictionaryapi.dev/) that returns a definition of a provided English word.*

The request to get a response from this REST API looks like this:

```bash
GET https://api.dictionaryapi.dev/api/v2/entries/en/{word} HTTP/1.1
```

This REST API data source sends a more complex response, which you can see [here](https://api.dictionaryapi.dev/api/v2/entries/en/hello) for the word `"hello"`.

Compared to the simple response you've seen above, this one is still in JSON format, but there's nested objects and arrays of objects as well. In this case the resulting Data Graph schema will be more complex.

In the first step you need to define your `query` root operation. Looking at the URL, you can already see that the data source requires a `String` as a path argument and that needs to be reflected in the Data Graph schema as well.

Looking at the [response](https://api.dictionaryapi.dev/api/v2/entries/en/see), you can also notice that it can contain more than one definition, since some words have multiple meanings. This needs to be reflected in what your `query` will return - an array of definitions.

```graphql
type Query {
    wordDefinition(word: String!): [WordDefinition]
}
```

Next step is to start designing the `WordDefinition` type. REST API data source returns 6 fields on the main level of the JSON response, you want to reflect this in your schema:

```graphql
type WordDefinition {
  word: String
  phonetic: String
  sourceUrls: [String]
  license: License
  meanings: [Meanings]
  phonetics: [Phonetics]
}
```

Some fields return objects (like `license`), some return arrays of strings (like `sourceUrls`) and some arrays of objects (like `meanings`) and you want to make sure that you replicate this pattern in your Data Graph schema.

{{< note success >}}
**Note**  

You don't have to mirror the data source response hierarchy 1-to-1 and it is possible to design your Data Graph schema differently. The advantage of doing 1-to-1 is the fact that in this case you will be able to connect your data source easily and UDG engine will automatically parse the response into the correct fields at every level.

To get away from your REST API data source schema and modify it in your Data Graph, you need to get familiar with the concept of [field mapping]({{< ref "/universal-data-graph/concepts/field_mappings">}}) and learn how to [connect a datasource]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource">}})

{{< /note >}}

Next step in designing your schema is to define the remaining types from the above example. Let's take a look at `meanings: [Meanings]`:

```graphql
type Meanings {
  partOfSpeech: String
  antonyms: [String]
  synonyms: [String]
  definitions: [Definition]
}
```

We have fields returning simple `String` here, but also another one returning an array of types - `definitions: [Definition]`. Let's define that:

```graphql
type Definition {
  definition: String
  antonyms: [String]
  synonyms: [String]
}
```

We got to a place where none of the fields return additional types, so we can move on to the next field from `WordDefinition` type.

Once you go through this process enough times, you should end up with a Data Graph schema that covers everything.

{{< note success >}}
**Note**  

Remember that in order for your Data Graph to work it is not necessary to define all the REST API response fields in Data Graph schema. You can skip the ones, that you do not want to expose to your consumers. This allows you to build multiple, different Data Graphs on top of the same data source(s).

{{< /note >}}

### Designing Data Graph schema for GraphQL API data source

Designing Data Graph schema, when planning to use a GreaphQL data source, is very easy because Data Graph schema is essentially a GraphQL schema.

The only thing you have to do is decide if you want to use all possible fields and types that your GQL data source provides or if you want to get rid of some of them.

*To illustrate this process, we will use a public GQL API called [Countries Trevorblades](https://countries.trevorblades.com/). You can browse its schema by clicking the notebook icon at the top right-hand corner of the page*

The GQL data source schema is quite extensive and it defines several different queries that the consumer can use:

```graphql
type Query {
  continent(code: ID!): Continent
  continents(filter: ContinentFilterInput = {}): [Continent!]!
  countries(filter: CountryFilterInput = {}): [Country!]!
  country(code: ID!): Country
  language(code: ID!): Language
  languages(filter: LanguageFilterInput = {}): [Language!]!
}
```

You can copy the GQL data source schema fully and allow the Data Graph to perform all the same operations. You can also decide to remove some of those operations and allow your Data Graph to only resolve `continent` and `country` queries.

```graphql
type Query {
  continent(code: ID!): Continent
  country(code: ID!): Country
}
```

Next step is to add all relevant `type` objects from the GQL data source schema, ignoring the ones related to all the queries you removed. The end result will be:

```graphql
type Query {
  continent(code: ID!): Continent
  country(code: ID!): Country
}

type Continent {
  code: ID!
  countries: [Country!]!
  name: String!
}

type Country {
  awsRegion: String!
  capital: String
  code: ID!
  continent: Continent!
  currencies: [String!]!
  currency: String
  emoji: String!
  emojiU: String!
  languages: [Language!]!
  name: String!
  native: String!
  phone: String!
  phones: [String!]!
  states: [State!]!
}

type Language {
  code: ID!
  name: String!
  native: String!
  rtl: Boolean!
}

type State {
  code: String
  country: Country!
  name: String!
}
```

At this point you can also remove any fields from any type and not show them in your Data Graph response.

### Next steps

Data Graph schema itself is not going to return any data, it's just a blueprint of your graph. Next step is to [attach your data sources]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource">}}) to it, so they can populate all the fields you've just designed with correct data.