module.exports = {
    '*.ts': ['eslint --fix', () => 'tsc-files --noEmit'],
    '*.json': ['prettier --write'],
    '*.md': ['prettier --write --print-width 80 --prose-wrap always'],
    'yarn.lock': ['yarn-deduplicate'],
};
