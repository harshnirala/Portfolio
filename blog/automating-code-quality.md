# Automating Code Quality: Building a Local CLI RAG Pipeline for Auto-Testing

**Published:** May 15, 2026  
**Read Time:** 6 min read  
**Category:** AI & Testing  

Writing comprehensive unit tests is often seen as a necessary chore. For large scale codebases, keeping tests synchronized with changing method APIs and logical branches demands constant developer overhead. However, with modern Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) pipelines, we can automate this process locally.

In this post, we'll walk through building a CLI-based automated testing pipeline (inspired by the architecture of **TestIQ**) that parses source directories, queries local models via Ollama, and utilizes self-correcting validation loops.

---

## The Architecture of an Autonomous Test Generator

Creating tests with a simple LLM prompt fails because LLMs lack contextual knowledge of codebase dependencies, custom helper files, and setup configurations. An autonomous RAG pipeline solves this by indexing the codebase structure and leveraging context injection during generation. 

The execution flow consists of three primary layers:
1. **Semantic Ingestion & Code Indexing:** Codebase scanning, syntax hierarchy tree extraction, and vector index generation.
2. **Retrieval & Prompt Construction:** Injecting helper utilities and framework standards into the generator prompt.
3. **Local LLM Generation & Self-Correction:** Executing code generation loops and running automated test suites to validate and fix syntax errors on-the-fly.

---

## Step 1: Code Parsing with Tree-Sitter & LangChain

Regular text splitters fail on source code because they break apart syntax structures (like class definitions or functions) randomly. Instead, we use `tree-sitter` to parse source code files into Abstract Syntax Trees (ASTs). This allows us to extract individual method declarations, parameters, and inline docstrings cleanly.

We chunk the files based on functions and class boundaries and load them into a vector database (e.g., **ChromaDB**) using local embeddings. Below is a simplified snippet showcasing semantic class parsing:

```python
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from tree_sitter import Language, Parser

# Load language parser (e.g. Python)
Language.build_library('build/my-languages.so', ['tree-sitter-python'])
PY_LANG = Language('build/my-languages.so', 'python')
parser = Parser()
parser.set_language(PY_LANG)

def extract_functions(source_code):
    tree = parser.parse(bytes(source_code, "utf8"))
    root_node = tree.root_node
    # Traverse nodes to pull function and class blocks
    # (returns individual logical code chunks)
    ...
```

---

## Step 2: Retrieval-Augmented Generation (RAG) Loop

When the developer requests tests for a target module, the CLI pipeline queries ChromaDB for structurally related components—such as database mocks, custom exception classes, or mock test configurations. These retrieved code segments are injected into the LLM system prompt as context, instructing the local model (e.g., `codellama:7b` running via Ollama) on the specific mock structures to use.

---

## Step 3: Self-Correcting Execution Loops

Local models can sometimes make syntax errors or hallucinate API calls. To prevent broken tests from polluting the repository, the pipeline executes the generated test file locally using a virtual test environment runner (like `pytest`). If the run fails, the stdout error trace is fed back into the LLM model with a request to correct the code. The loop repeats until all tests pass.

```python
import subprocess

def validate_generated_test(test_file_path, target_module_path):
    # Execute pytest as a local subprocess
    result = subprocess.run(["pytest", test_file_path], capture_output=True, text=True)
    
    if result.returncode != 0:
        print("[WARNING] Verification failed! Sending errors to correction loop...")
        return False, result.stderr
        
    print("[SUCCESS] Test compiled and passed perfectly!")
    return True, None
```

---

## Key Results & Advantages

By leveraging local models and RAG pipeline configurations, developers achieve:
- **Data Privacy:** No code leaves the developer's computer, bypassing enterprise security risks.
- **Accelerated Workflows:** Reduces initial test coverage generation times from hours to seconds.
- **Higher Test Integrity:** Test files are guaranteed to compile and run prior to staging.

Automated code quality tools represent the future of software engineering. By building self-correcting pipelines like TestIQ, we shift from manually writing boilerplate assertions to supervising self-verifying, robust code generation systems.
