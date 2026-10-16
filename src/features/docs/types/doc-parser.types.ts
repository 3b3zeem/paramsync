export interface ParserParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface CleanUrlRule {
  condition: string;
  behavior: string;
  exampleUrl: string;
}

export interface ParserDocItem {
  slug: string;
  name: string;
  signature: string;
  returnType: string;
  summary: string;
  whatItDoes: string;
  bestFor: string[];
  cleanUrlBehavior: {
    rule: string;
    description: string;
    rules: CleanUrlRule[];
  };
  parameters?: ParserParameter[];
  codeExample: string;
  advancedExample?: string;
  relatedParsers?: { name: string; href: string }[];
}
