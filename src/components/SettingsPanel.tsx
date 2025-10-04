import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    enableGPT4: true,
    enableClaude: true,
    enableGemini: true,
    enableMistral: true,
    enableLlama: true,
    checksPerModel: 3,
    autoFix: false,
    webSearchEnabled: true,
    strictMode: true,
    analyzeUnusedCode: true,
    analyzePerformance: true,
    analyzeSecurity: true,
    severityLevel: "all"
  });

  const handleSettingChange = (key: string, value: boolean | number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast.success("Настройки сохранены успешно!");
  };

  const resetSettings = () => {
    setSettings({
      enableGPT4: true,
      enableClaude: true,
      enableGemini: true,
      enableMistral: true,
      enableLlama: true,
      checksPerModel: 3,
      autoFix: false,
      webSearchEnabled: true,
      strictMode: true,
      analyzeUnusedCode: true,
      analyzePerformance: true,
      analyzeSecurity: true,
      severityLevel: "all"
    });
    toast.info("Настройки сброшены к значениям по умолчанию");
  };

  const activeModels = [
    settings.enableGPT4,
    settings.enableClaude,
    settings.enableGemini,
    settings.enableMistral,
    settings.enableLlama
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Cpu" className="w-5 h-5" />
            Активные AI модели
          </CardTitle>
          <CardDescription className="text-[#00FFFF]">
            Выберите модели для анализа кода ({activeModels}/5 активно)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Brain" className="w-5 h-5 text-[#00FF41]" />
              <div>
                <Label className="text-[#00FF41]">GPT-4 Turbo</Label>
                <p className="text-xs text-[#00FFFF]/60">Лучшая для сложной логики</p>
              </div>
            </div>
            <Switch
              checked={settings.enableGPT4}
              onCheckedChange={(val) => handleSettingChange("enableGPT4", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Zap" className="w-5 h-5 text-[#00FF41]" />
              <div>
                <Label className="text-[#00FF41]">Claude 3 Opus</Label>
                <p className="text-xs text-[#00FFFF]/60">Отлично находит заглушки</p>
              </div>
            </div>
            <Switch
              checked={settings.enableClaude}
              onCheckedChange={(val) => handleSettingChange("enableClaude", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Sparkles" className="w-5 h-5 text-[#00FF41]" />
              <div>
                <Label className="text-[#00FF41]">Gemini Pro</Label>
                <p className="text-xs text-[#00FFFF]/60">Анализ производительности</p>
              </div>
            </div>
            <Switch
              checked={settings.enableGemini}
              onCheckedChange={(val) => handleSettingChange("enableGemini", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="w-5 h-5 text-[#00FF41]" />
              <div>
                <Label className="text-[#00FF41]">Mistral Large</Label>
                <p className="text-xs text-[#00FFFF]/60">Безопасность кода</p>
              </div>
            </div>
            <Switch
              checked={settings.enableMistral}
              onCheckedChange={(val) => handleSettingChange("enableMistral", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Rocket" className="w-5 h-5 text-[#00FF41]" />
              <div>
                <Label className="text-[#00FF41]">LLaMA 3.1</Label>
                <p className="text-xs text-[#00FFFF]/60">Best practices</p>
              </div>
            </div>
            <Switch
              checked={settings.enableLlama}
              onCheckedChange={(val) => handleSettingChange("enableLlama", val)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Settings2" className="w-5 h-5" />
            Параметры анализа
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[#00FF41]">Количество проверок на модель</Label>
              <Badge variant="outline" className="text-[#00FFFF] border-[#00FFFF]">
                {settings.checksPerModel}x
              </Badge>
            </div>
            <Slider
              value={[settings.checksPerModel]}
              onValueChange={(val) => handleSettingChange("checksPerModel", val[0])}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-[#00FFFF]/60">
              Каждая модель будет проверять код {settings.checksPerModel} раза
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div>
              <Label className="text-[#00FF41]">Поиск в интернете</Label>
              <p className="text-xs text-[#00FFFF]/60">
                Проверять документацию команд перед анализом
              </p>
            </div>
            <Switch
              checked={settings.webSearchEnabled}
              onCheckedChange={(val) => handleSettingChange("webSearchEnabled", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div>
              <Label className="text-[#00FF41]">Строгий режим</Label>
              <p className="text-xs text-[#00FFFF]/60">
                Максимально тщательная проверка каждой строки
              </p>
            </div>
            <Switch
              checked={settings.strictMode}
              onCheckedChange={(val) => handleSettingChange("strictMode", val)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-[#00FF41]">Минимальный уровень важности</Label>
            <Select
              value={settings.severityLevel}
              onValueChange={(val) => handleSettingChange("severityLevel", val)}
            >
              <SelectTrigger className="bg-[#0a0e1a] border-[#00FF41]/30 text-[#00FF41]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все (включая рекомендации)</SelectItem>
                <SelectItem value="warnings">Предупреждения и выше</SelectItem>
                <SelectItem value="errors">Только ошибки</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0d1117] border-[#00FF41]/30">
        <CardHeader>
          <CardTitle className="text-[#00FF41] flex items-center gap-2">
            <Icon name="Filter" className="w-5 h-5" />
            Типы проверок
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Trash2" className="w-5 h-5 text-[#00FFFF]" />
              <Label className="text-[#00FF41]">Неиспользуемый код</Label>
            </div>
            <Switch
              checked={settings.analyzeUnusedCode}
              onCheckedChange={(val) => handleSettingChange("analyzeUnusedCode", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Gauge" className="w-5 h-5 text-[#00FFFF]" />
              <Label className="text-[#00FF41]">Производительность</Label>
            </div>
            <Switch
              checked={settings.analyzePerformance}
              onCheckedChange={(val) => handleSettingChange("analyzePerformance", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="ShieldAlert" className="w-5 h-5 text-[#00FFFF]" />
              <Label className="text-[#00FF41]">Безопасность</Label>
            </div>
            <Switch
              checked={settings.analyzeSecurity}
              onCheckedChange={(val) => handleSettingChange("analyzeSecurity", val)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0e1a] rounded border border-[#00FF41]/20">
            <div className="flex items-center gap-3">
              <Icon name="Wand2" className="w-5 h-5 text-[#00FFFF]" />
              <Label className="text-[#00FF41]">Автоматическое исправление</Label>
            </div>
            <Switch
              checked={settings.autoFix}
              onCheckedChange={(val) => handleSettingChange("autoFix", val)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={saveSettings}
          className="flex-1 bg-[#00FF41] text-[#0a0e1a] hover:bg-[#00FF41]/80"
        >
          <Icon name="Save" className="w-4 h-4 mr-2" />
          Сохранить настройки
        </Button>
        <Button
          onClick={resetSettings}
          variant="outline"
          className="flex-1 text-[#00FFFF] border-[#00FFFF]/30"
        >
          <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
