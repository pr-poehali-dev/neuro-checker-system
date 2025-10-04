import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AnalysisResult {
  id: string;
  analyzer: string;
  status: 'analyzing' | 'complete' | 'error';
  issues: Issue[];
  summary: string;
}

interface Issue {
  id: string;
  line: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  selected: boolean;
}

const ANALYZERS = [
  { id: 'security', name: 'Security Analyzer', icon: 'Shield' },
  { id: 'performance', name: 'Performance Analyzer', icon: 'Zap' },
  { id: 'best-practices', name: 'Best Practices', icon: 'BookOpen' },
  { id: 'logic', name: 'Logic Analyzer', icon: 'Brain' },
  { id: 'documentation', name: 'Documentation', icon: 'FileText' }
];

const CodeAnalyzer = () => {
  const [code, setCode] = useState(`function example() {\n  var x = 10;\n  console.log(x);\n  return x;\n}`);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('editor');

  const simulateAnalysis = async () => {
    setAnalyzing(true);
    setSelectedTab('analysis');
    
    const newResults: AnalysisResult[] = ANALYZERS.map(analyzer => ({
      id: analyzer.id,
      analyzer: analyzer.name,
      status: 'analyzing' as const,
      issues: [],
      summary: ''
    }));
    
    setResults(newResults);

    for (let i = 0; i < ANALYZERS.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockIssues: Issue[] = [
        {
          id: `${ANALYZERS[i].id}-1`,
          line: 2,
          severity: 'warning',
          message: `[${ANALYZERS[i].name}] Используется var вместо let/const`,
          suggestion: 'Замените var на const или let для улучшения области видимости',
          selected: true
        },
        {
          id: `${ANALYZERS[i].id}-2`,
          line: 3,
          severity: 'info',
          message: `[${ANALYZERS[i].name}] Console.log в production коде`,
          suggestion: 'Удалите console.log или используйте logger',
          selected: true
        }
      ];

      setResults(prev => prev.map(r => 
        r.id === ANALYZERS[i].id 
          ? { 
              ...r, 
              status: 'complete', 
              issues: mockIssues,
              summary: `Проверка завершена. Найдено: ${mockIssues.length} проблем` 
            }
          : r
      ));
    }

    setAnalyzing(false);
    toast.success('Анализ завершён! Найдено проблем: ' + (ANALYZERS.length * 2));
  };

  const toggleIssue = (analyzerId: string, issueId: string) => {
    setResults(prev => prev.map(r => 
      r.id === analyzerId
        ? {
            ...r,
            issues: r.issues.map(issue =>
              issue.id === issueId ? { ...issue, selected: !issue.selected } : issue
            )
          }
        : r
    ));
  };

  const fixSelectedIssues = () => {
    const selectedIssues = results.flatMap(r => r.issues.filter(i => i.selected));
    if (selectedIssues.length === 0) {
      toast.error('Выберите проблемы для исправления');
      return;
    }
    
    toast.success(`Исправляем ${selectedIssues.length} проблем...`);
    
    setTimeout(() => {
      setCode(`function example() {\n  const x = 10;\n  // Removed console.log\n  return x;\n}`);
      toast.success('Код успешно исправлен!');
      setResults([]);
      setSelectedTab('editor');
    }, 2000);
  };

  const totalIssues = results.reduce((acc, r) => acc + r.issues.length, 0);
  const selectedCount = results.reduce((acc, r) => acc + r.issues.filter(i => i.selected).length, 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-[#00FF41] pb-4">
          <h1 className="text-3xl md:text-4xl font-bold terminal-glow mb-2">
            {'>'} CODE ANALYZER AI
          </h1>
          <p className="text-[#4ECDC4] text-sm">Мультиагентная система анализа кода</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="bg-[#1A1F2C] border border-[#00FF41]">
            <TabsTrigger value="editor" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black">
              <Icon name="Code" className="w-4 h-4 mr-2" />
              Редактор
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black">
              <Icon name="Activity" className="w-4 h-4 mr-2" />
              Анализ ({totalIssues})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-black">
              <Icon name="History" className="w-4 h-4 mr-2" />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <Card className="bg-[#1A1F2C] border-[#00FF41] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#00FF41]">{'>'} Код для анализа</h2>
                <Button 
                  onClick={simulateAnalysis} 
                  disabled={analyzing}
                  className="bg-[#00FF41] text-black hover:bg-[#00DD33]"
                >
                  {analyzing ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Анализируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" className="w-4 h-4 mr-2" />
                      Запустить анализ
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm bg-[#0a0e1a] border-[#00FF41] text-[#00FF41] focus:ring-[#00FF41]"
                placeholder="Вставьте код для анализа..."
              />
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            {results.length === 0 ? (
              <Card className="bg-[#1A1F2C] border-[#00FF41] p-12 text-center">
                <Icon name="Search" className="w-16 h-16 mx-auto mb-4 text-[#4ECDC4]" />
                <p className="text-[#4ECDC4]">Запустите анализ для просмотра результатов</p>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {ANALYZERS.map((analyzer, idx) => {
                    const result = results.find(r => r.id === analyzer.id);
                    return (
                      <Card key={analyzer.id} className="bg-[#1A1F2C] border-[#00FF41] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name={analyzer.icon as any} className="w-5 h-5 text-[#00FF41]" />
                          <h3 className="text-sm font-semibold text-[#00FF41]">{analyzer.name}</h3>
                        </div>
                        {result?.status === 'analyzing' && (
                          <div className="flex items-center gap-2">
                            <Icon name="Loader2" className="w-4 h-4 animate-spin text-[#4ECDC4]" />
                            <span className="text-xs text-[#4ECDC4]">Проверка {idx + 1}/3...</span>
                          </div>
                        )}
                        {result?.status === 'complete' && (
                          <p className="text-xs text-[#4ECDC4]">{result.issues.length} проблем</p>
                        )}
                      </Card>
                    );
                  })}
                </div>

                <Card className="bg-[#1A1F2C] border-[#00FF41] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#00FF41]">
                      {'>'} Найденные проблемы ({selectedCount}/{totalIssues} выбрано)
                    </h2>
                    <Button 
                      onClick={fixSelectedIssues}
                      disabled={selectedCount === 0}
                      className="bg-[#00FF41] text-black hover:bg-[#00DD33]"
                    >
                      <Icon name="Wrench" className="w-4 h-4 mr-2" />
                      Исправить выбранные
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {results.map(result => (
                      <div key={result.id} className="space-y-3">
                        {result.issues.map(issue => (
                          <div 
                            key={issue.id} 
                            className="flex items-start gap-4 p-4 bg-[#0a0e1a] border border-[#00FF41]/30 rounded"
                          >
                            <Checkbox
                              checked={issue.selected}
                              onCheckedChange={() => toggleIssue(result.id, issue.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  issue.severity === 'error' ? 'bg-[#FF6B6B] text-white' :
                                  issue.severity === 'warning' ? 'bg-[#FFA500] text-black' :
                                  'bg-[#4ECDC4] text-black'
                                }`}>
                                  {issue.severity.toUpperCase()}
                                </span>
                                <span className="text-xs text-[#4ECDC4]">Строка {issue.line}</span>
                              </div>
                              <p className="text-[#00FF41] mb-2">{issue.message}</p>
                              <p className="text-sm text-[#4ECDC4]">
                                <Icon name="Lightbulb" className="w-4 h-4 inline mr-1" />
                                {issue.suggestion}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-[#1A1F2C] border-[#00FF41] p-12 text-center">
              <Icon name="Clock" className="w-16 h-16 mx-auto mb-4 text-[#4ECDC4]" />
              <p className="text-[#4ECDC4]">История анализов будет отображаться здесь</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeAnalyzer;
