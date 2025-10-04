import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeAnalyzer from "@/components/CodeAnalyzer";
import ReportsPanel from "@/components/ReportsPanel";
import FixesPanel from "@/components/FixesPanel";
import HistoryPanel from "@/components/HistoryPanel";
import SettingsPanel from "@/components/SettingsPanel";
import DocsPanel from "@/components/DocsPanel";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("analyzer");

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#00FF41] p-4">
      <header className="mb-6 border-b border-[#00FF41]/30 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Terminal" className="w-8 h-8 text-[#00FF41]" />
          <h1 className="text-3xl font-bold terminal-glow">AI CODE ANALYZER</h1>
        </div>
        <p className="text-[#00FFFF] text-sm ml-11">
          &gt; Множественная проверка кода с использованием 5+ AI моделей
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 gap-2 bg-[#0d1117] border border-[#00FF41]/30 p-1 mb-6">
          <TabsTrigger 
            value="analyzer" 
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="Search" className="w-4 h-4 mr-2" />
            Анализатор
          </TabsTrigger>
          <TabsTrigger 
            value="reports"
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="FileText" className="w-4 h-4 mr-2" />
            Отчёты
          </TabsTrigger>
          <TabsTrigger 
            value="fixes"
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="Wrench" className="w-4 h-4 mr-2" />
            Исправления
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="History" className="w-4 h-4 mr-2" />
            История
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="Settings" className="w-4 h-4 mr-2" />
            Настройки
          </TabsTrigger>
          <TabsTrigger 
            value="docs"
            className="data-[state=active]:bg-[#00FF41] data-[state=active]:text-[#0a0e1a] text-[#00FF41]"
          >
            <Icon name="Book" className="w-4 h-4 mr-2" />
            Документация
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer">
          <CodeAnalyzer />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsPanel />
        </TabsContent>

        <TabsContent value="fixes">
          <FixesPanel />
        </TabsContent>

        <TabsContent value="history">
          <HistoryPanel />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>

        <TabsContent value="docs">
          <DocsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
