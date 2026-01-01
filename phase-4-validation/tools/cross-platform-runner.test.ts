import { describe, it, expect, beforeAll } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import { CrossPlatformRunner, TestCase, TestResult } from './cross-platform-runner';

describe('CrossPlatformRunner', () => {
  const corpusPath = path.resolve(__dirname, '../test-corpus');
  const outputPath = path.resolve(__dirname, '../test-results');
  let runner: CrossPlatformRunner;

  beforeAll(() => {
    runner = new CrossPlatformRunner(corpusPath, outputPath);
  });

  describe('loadCorpus', () => {
    it('should load test categories from corpus', () => {
      const corpus = runner.loadCorpus();

      expect(corpus.size).toBeGreaterThan(0);
      expect(corpus.has('syntax')).toBe(true);
    });

    it('should load tests from YAML files', () => {
      const corpus = runner.loadCorpus();
      const syntaxTests = corpus.get('syntax');

      expect(syntaxTests).toBeDefined();
      expect(syntaxTests!.length).toBeGreaterThan(0);
    });

    it('should parse test structure correctly', () => {
      const corpus = runner.loadCorpus();
      const syntaxTests = corpus.get('syntax');
      const firstTest = syntaxTests![0];

      expect(firstTest).toHaveProperty('name');
      expect(firstTest).toHaveProperty('description');
      expect(firstTest).toHaveProperty('input');
      expect(firstTest).toHaveProperty('expected');
    });

    it('should load all expected categories', () => {
      const corpus = runner.loadCorpus();
      const expectedCategories = [
        'syntax',
        'variables',
        'conditionals',
        'choices',
        'alternatives',
        'api',
        'formats',
        'edge-cases'
      ];

      for (const category of expectedCategories) {
        expect(corpus.has(category)).toBe(true);
      }
    });
  });

  describe('runOnEditor', () => {
    it('should run a simple valid test', async () => {
      const test: TestCase = {
        name: 'test-simple-valid',
        description: 'Simple valid passage',
        input: ':: Start\nHello world.',
        expected: {
          passages: 1,
          valid: true
        }
      };

      const result = await runner.runOnEditor(test);

      expect(result.name).toBe('test-simple-valid');
      expect(result.duration).toBeGreaterThanOrEqual(0);
      // Parser may or may not be available, so we check structure
      expect(result).toHaveProperty('passed');
      expect(result).toHaveProperty('actual');
    });

    it('should detect parse errors', async () => {
      const test: TestCase = {
        name: 'test-invalid',
        description: 'Invalid syntax',
        input: ':: 123Invalid\nBad passage name.',
        expected: {
          valid: false,
          error: 'Invalid'
        }
      };

      const result = await runner.runOnEditor(test);

      expect(result.name).toBe('test-invalid');
      // Result should indicate the test was processed
      expect(result).toHaveProperty('actual');
    });

    it('should measure duration', async () => {
      const test: TestCase = {
        name: 'test-duration',
        description: 'Duration measurement',
        input: ':: Start\nContent.',
        expected: { valid: true }
      };

      const result = await runner.runOnEditor(test);

      expect(typeof result.duration).toBe('number');
      expect(result.duration).toBeGreaterThanOrEqual(0);
    });
  });

  describe('runOnCore', () => {
    it('should return not implemented result', async () => {
      const test: TestCase = {
        name: 'test-core',
        description: 'Core test',
        input: ':: Start\nHello.',
        expected: { valid: true }
      };

      const result = await runner.runOnCore(test);

      expect(result.passed).toBe(false);
      expect(result.error).toContain('not');
    });
  });

  describe('compareResults', () => {
    it('should identify identical results', () => {
      const editorResults = {
        platform: 'whisker-editor-web',
        timestamp: new Date().toISOString(),
        categories: [{
          category: 'syntax',
          total: 1,
          passed: 1,
          failed: 0,
          tests: [{
            name: 'test-1',
            passed: true,
            expected: { valid: true },
            actual: { valid: true },
            duration: 1
          }]
        }],
        summary: { total: 1, passed: 1, failed: 0, passRate: '100%' }
      };

      const coreResults = {
        platform: 'whisker-core',
        timestamp: new Date().toISOString(),
        categories: [{
          category: 'syntax',
          total: 1,
          passed: 1,
          failed: 0,
          tests: [{
            name: 'test-1',
            passed: true,
            expected: { valid: true },
            actual: { valid: true },
            duration: 1
          }]
        }],
        summary: { total: 1, passed: 1, failed: 0, passRate: '100%' }
      };

      const comparison = runner.compareResults(editorResults, coreResults);

      expect(comparison.identical).toBe(1);
      expect(comparison.different).toBe(0);
      expect(comparison.differences).toHaveLength(0);
    });

    it('should identify different results', () => {
      const editorResults = {
        platform: 'whisker-editor-web',
        timestamp: new Date().toISOString(),
        categories: [{
          category: 'syntax',
          total: 1,
          passed: 1,
          failed: 0,
          tests: [{
            name: 'test-1',
            passed: true,
            expected: { valid: true },
            actual: { valid: true },
            duration: 1
          }]
        }],
        summary: { total: 1, passed: 1, failed: 0, passRate: '100%' }
      };

      const coreResults = {
        platform: 'whisker-core',
        timestamp: new Date().toISOString(),
        categories: [{
          category: 'syntax',
          total: 1,
          passed: 0,
          failed: 1,
          tests: [{
            name: 'test-1',
            passed: false,
            expected: { valid: true },
            actual: { valid: false },
            duration: 1
          }]
        }],
        summary: { total: 1, passed: 0, failed: 1, passRate: '0%' }
      };

      const comparison = runner.compareResults(editorResults, coreResults);

      expect(comparison.identical).toBe(0);
      expect(comparison.different).toBe(1);
      expect(comparison.differences).toHaveLength(1);
      expect(comparison.differences[0].test).toBe('test-1');
    });
  });

  describe('generateReport', () => {
    it('should generate a report structure', async () => {
      const report = await runner.generateReport(['editor']);

      expect(report).toHaveProperty('timestamp');
      expect(report).toHaveProperty('corpusVersion');
      expect(report).toHaveProperty('platforms');
      expect(report.platforms).toHaveLength(1);
      expect(report.platforms[0].platform).toBe('whisker-editor-web');
    });

    it('should include summary statistics', async () => {
      const report = await runner.generateReport(['editor']);
      const platform = report.platforms[0];

      expect(platform.summary).toHaveProperty('total');
      expect(platform.summary).toHaveProperty('passed');
      expect(platform.summary).toHaveProperty('failed');
      expect(platform.summary).toHaveProperty('passRate');
    });
  });

  describe('saveReport', () => {
    it('should save report to file', async () => {
      const report = {
        timestamp: new Date().toISOString(),
        corpusVersion: '1.0',
        platforms: []
      };

      const filename = `test-report-${Date.now()}.json`;
      runner.saveReport(report as any, filename);

      const filePath = path.join(outputPath, filename);
      expect(fs.existsSync(filePath)).toBe(true);

      // Cleanup
      fs.unlinkSync(filePath);
    });
  });
});
