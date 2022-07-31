import { ImportResolver } from 'pyright-internal/analyzer/importResolver';
import { Program } from 'pyright-internal/analyzer/program';
import { ConfigOptions } from 'pyright-internal/common/configOptions';
import { FullAccessHost } from 'pyright-internal/common/fullAccessHost';
import { createFromRealFileSystem } from 'pyright-internal/common/realFileSystem';
import { IndexOptions } from 'pyright-internal/languageService/documentSymbolProvider';

function main() {
    const realFs = createFromRealFileSystem();
    const configOptions = new ConfigOptions('/home/thuando/code/call-graph/pyright/packages/pyright/data/prj1');
    const initialImportResolver = new ImportResolver(realFs, configOptions, new FullAccessHost(realFs));
    const program = new Program(initialImportResolver, configOptions);
    program.setFileOpened('/home/thuando/code/call-graph/pyright/packages/pyright/data/prj1/a.py', 1, []);
    program.setTrackedFiles(['/home/thuando/code/call-graph/pyright/packages/pyright/data/prj1/a.py']);
    const isAnalyzedSucceed = program.analyze();
    console.log(isAnalyzedSucceed);
    const indexOptions: IndexOptions = {
        forceIndexing: true,
        indexingForAutoImportMode: true,
    };
    const file = program.getOpened()[0];
    const isParsed = file.sourceFile.parse(configOptions, initialImportResolver, file.sourceFile.getFileContent());
    console.log(isParsed);
    console.log(
        program.getFileIndex('/home/thuando/code/call-graph/pyright/packages/pyright/data/prj1/a.py', indexOptions)
    );
}

main();
