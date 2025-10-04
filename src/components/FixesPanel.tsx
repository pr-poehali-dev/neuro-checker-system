import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Fix {
  id: string;
  line: number;
  type: "error" | "warning" | "info";
  title: string;
  current: string;
  proposed: string;
  selected: boolean;
  verified: boolean;
  aiModel: string;
}

const FixesPanel = () => {
  const [fixes, setFixes] = useState<Fix[]>([
    {
      id: "1",
      line: 42,
      type: "error",
      title: "SQL injection уязвимость",
      current: 'query = "SELECT * FROM users WHERE id=" + userId',
      proposed: 'query = "SELECT * FROM users WHERE id=?"; params = [userId]',
      selected: true,
      verified: true,
      aiModel: "GPT-4 Turbo"
    },
    {
      id: "2",
      line: 89,
      type: "error",
      title: "Незащищённое хранение паролей",
      current: 'db.save({password: password})',
      proposed: 'db.save({password: bcrypt.hash(password, 10)})',
      selected: true,
      verified: true,
      aiModel: "Claude 3 Opus"
    },
    {
      id: "3",
      line: 23,
      type: "warning",
      title: "Неиспользуемая функция",
      current: 'function calculateDiscount() { /* 50 строк кода */ }',
      proposed: '// Функция удалена - нигде не используется',
      selected: false,
      verified: true,
      aiModel: "Gemini Pro"
    },
    {
      id: "4",
      line: 178,
      type: "warning",
      title: "Неэффективный алгоритм O(n²)",
      current: 'for(i) { for(j) { compare(i,j) } }',
      proposed: 'items.sort(); // O(n log n) вместо O(n²)',
      selected: true,
      verified: true,
      aiModel: "Mistral Large"
    }
  ]);

  const [fixing, setFixing] = useState(false);
  const [fixProgress, setFixProgress] = useState(0);

  const toggleFix = (id: string) => {
    setFixes(prev => prev.map(fix => 
      fix.id === id ? { ...fix, selected: !fix.selected } : fix
    ));
  };

  const selectAll = () => {
    setFixes(prev => prev.map(fix => ({ ...fix, selected: true })));
  };

  const deselectAll = () => {
    setFixes(prev => prev.map(fix => ({ ...fix, selected: false })));
  };

  const applyFixes = async () => {
    const selectedFixes = fixes.filter(f => f.selected);
    if (selectedFixes.length === 0) {
      toast.error("Выберите исправления для применения");
      return;
    }

    setFixing(true);
    setFixProgress(0);

    for (let i = 0; i < selectedFixes.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFixProgress(((i + 1) / selectedFixes.length) * 100);
      toast.info(`Исправление ${i + 1}/${selectedFixes.length}: ${selectedFixes[i].title}`);
    }

    setFixing(false);
    toast.success(`Успешно применено ${selectedFixes.length} исправлений!`);
    setFixes(prev => prev.filter(f => !f.selected));
  };

  const selectedCount = fixes.filter(f => f.selected).length;
  const errorCount = fixes.filter(f => f.type === "error").length;
  const warningCount = fixes.filter(f => f.type === "warning").length;

  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Wrench" className="w-5 h-5" />
            Предлагаемые исправления
          </CardTitle>
          <CardDescription className="text-[#00FFFF]">
            Выберите исправления для автоматического применения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B]">
                {errorCount} ошибок
              </Badge>
              <Badge variant="outline" className="text-[#FFA500] border-[#FFA500]">
                {warningCount} предупреждений
              </Badge>
              <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF]">
                {selectedCount} выбрано
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAll}
                className="text-[#00FF41] border-[#00FF41]"
              >
                Выбрать все
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deselectAll}
                className="text-[#00FFFF] border-[#00FFFF]"
              >
                Снять все
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {fixes.map((fix) => (
                <div
                  key={fix.id}
                  className={`p-4 rounded border-2 ${
                    fix.selected 
                      ? 'border-[#00FF41] bg-[#00FF41]/5' 
                      : 'border-[#00FF41]/20 bg-[#0a0e1a]'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Checkbox
                      checked={fix.selected}
                      onCheckedChange={() => toggleFix(fix.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="outline"
                          className={`${
                            fix.type === 'error' 
                              ? 'text-[#FF6B6B] border-[#FF6B6B]' 
                              : fix.type === 'warning'
                              ? 'text-[#FFA500] border-[#FFA500]'
                              : 'text-[#4ECDC4] border-[#4ECDC4]'
                          }`}
                        >
                          {fix.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF]">
                          Строка {fix.line}
                        </Badge>
                        {fix.verified && (
                          <Badge variant="outline" className="text-[#00FF41] border-[#00FF41]">
                            <Icon name="CheckCircle2" className="w-3 h-3 mr-1" />
                            Проверено
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-[#00FFFF]/60 border-[#00FFFF]/30">
                          {fix.aiModel}
                        </Badge>
                      </div>
                      <h4 className="text-[#00FF41] font-semibold mb-3">{fix.title}</h4>
                      
                      <div className="space-y-2">
                        <div className="bg-[#0a0e1a] p-3 rounded border border-[#FF6B6B]/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="X" className="w-4 h-4 text-[#FF6B6B]" />
                            <span className="text-xs text-[#FF6B6B]">Текущий код:</span>
                          </div>
                          <code className="text-sm text-[#00FF41] font-mono">{fix.current}</code>
                        </div>
                        
                        <div className="bg-[#0a0e1a] p-3 rounded border border-[#00FF41]/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="Check" className="w-4 h-4 text-[#00FF41]" />
                            <span className="text-xs text-[#00FF41]">Предлагаемое исправление:</span>
                          </div>
                          <code className="text-sm text-[#00FFFF] font-mono">{fix.proposed}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Info" className="w-5 h-5 text-[#00FFFF]" />
              <span className="text-[#00FFFF]">
                {selectedCount > 0 
                  ? `Готово к применению ${selectedCount} исправлений` 
                  : "Выберите исправления для применения"}
              </span>
            </div>
            <Button
              onClick={applyFixes}
              disabled={fixing || selectedCount === 0}
              className="bg-[#00FF41] text-[#0a0e1a] hover:bg-[#00FF41]/80"
            >
              {fixing ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Применение...
                </>
              ) : (
                <>
                  <Icon name="Zap" className="w-4 h-4 mr-2" />
                  Применить исправления
                </>
              )}
            </Button>
          </div>

          {fixing && (
            <div className="space-y-2">
              <Progress value={fixProgress} className="h-2 bg-[#0a0e1a]" />
              <p className="text-sm text-[#00FFFF] text-center">
                {Math.round(fixProgress)}% завершено
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FixesPanel;
