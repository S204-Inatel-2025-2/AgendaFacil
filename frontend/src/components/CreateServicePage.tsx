import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Upload, 
  Tag, 
  Plus, 
  Trash, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign,
  Image as ImageIcon,
  Settings,
  Sparkles,
  X,
  Eye,
  CheckCircle2
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "./ui/select";
import toast from "react-hot-toast";

interface CreateServicePageProps {
  onBack: () => void;
  onCreate?: (serviceData: any) => void;
}

export default function CreateServicePage({ onBack, onCreate }: CreateServicePageProps) {
  const [showPreview, setShowPreview] = useState(true);
  
  // Estados da empresa
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [allowCoupon, setAllowCoupon] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  
  // Estados dos serviços
  const [services, setServices] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddService = () => {
    if (!serviceName.trim()) {
      toast.error("❌ Preencha o nome do serviço");
      return;
    }
    const newService = {
      id: crypto?.randomUUID?.() ?? Date.now().toString(),
      name: serviceName.trim(),
      description: serviceDescription.trim(),
      price: servicePrice.trim(),
      duration: serviceDuration.trim(),
    };
    setServices(prev => [...prev, newService]);
    toast.success("✅ Serviço adicionado!");
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
    setServiceDuration("");
  };

  const handleSubmit = () => {
    if (!companyName.trim()) {
      toast.error("❌ Preencha o nome da empresa");
      return;
    }
    if (!category) {
      toast.error("❌ Selecione uma categoria");
      return;
    }
    if (services.length === 0) {
      toast.error("❌ Adicione pelo menos um serviço");
      return;
    }

    const serviceData = {
      id: crypto.randomUUID(),
      companyName,
      companyDescription,
      category,
      location,
      availability,
      tags,
      allowCoupon,
      image,
      services,
    };

    if (onCreate) {
      onCreate(serviceData);
    } else {
      toast.success("✅ Empresa e serviços criados com sucesso!");
      setCompanyName("");
      setCompanyDescription("");
      setCategory("");
      setLocation("");
      setAvailability("");
      setTags([]);
      setAllowCoupon(false);
      setImage(null);
      setServices([]);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        {/* Navegação e Indicadores */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className={`w-4 h-4 ${companyName && category ? 'text-emerald-600' : 'text-muted-foreground'}`} />
              <span>Empresa</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className={`w-4 h-4 ${services.length > 0 ? 'text-emerald-600' : 'text-muted-foreground'}`} />
              <span>Serviços</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="md:hidden"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Layout Principal - Duas Colunas */}
        <div>
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            
            {/* Coluna Esquerda - Formulário */}
            <div className="space-y-6">
              {/* Informações Básicas */}
              <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Informações Básicas</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Nome da Empresa *</Label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Salão Beleza & Estilo"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Descrição</Label>
                    <Textarea
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      placeholder="Descreva sua empresa..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Categoria *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultas-medicas">Consultas Médicas</SelectItem>
                          <SelectItem value="beleza-estetica">Beleza & Estética</SelectItem>
                          <SelectItem value="assistencia-tecnica">Assistência Técnica</SelectItem>
                          <SelectItem value="aulas-particulares">Aulas Particulares</SelectItem>
                          <SelectItem value="bem-estar">Bem-estar</SelectItem>
                          <SelectItem value="automotivo">Automotivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-2 block">Localização</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Endereço"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Disponibilidade</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        placeholder="Ex: Seg-Sex, 10h-18h"
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Tags</h2>
                </div>
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Adicionar tag..."
                      className="pl-10 h-11"
                    />
                  </div>
                  <Button onClick={handleAddTag} size="icon" className="h-11 w-11">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                        {t}
                        <button onClick={() => handleRemoveTag(i)} className="hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>

              {/* Adicionar Serviço */}
              <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-semibold">Adicionar Serviço</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Nome *</Label>
                      <Input
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Nome do serviço"
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Preço</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={servicePrice}
                          onChange={(e) => setServicePrice(e.target.value)}
                          placeholder="R$ 0,00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Duração (min)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={serviceDuration}
                        onChange={(e) => setServiceDuration(e.target.value)}
                        placeholder="45"
                        type="number"
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Descrição</Label>
                    <Textarea
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Descreva o serviço..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button
                    onClick={handleAddService}
                    className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </Card>

              {/* Lista de Serviços */}
              {services.length > 0 && (
                <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                  <h3 className="text-lg font-semibold mb-4">Serviços Adicionados ({services.length})</h3>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {services.map((s) => (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between p-3 border border-border/30 rounded-lg hover:bg-muted/30"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {s.price && <span className="text-primary font-medium">{s.price}</span>}
                              {s.duration && <span className="ml-3">{s.duration} min</span>}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setServices(prev => prev.filter(x => x.id !== s.id));
                              toast.success("Serviço removido");
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </Card>
              )}

              {/* Configurações */}
              <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Configurações</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Permitir cupons</p>
                      <p className="text-xs text-muted-foreground">Clientes podem usar cupons</p>
                    </div>
                    <Switch checked={allowCoupon} onCheckedChange={setAllowCoupon} />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Imagem de Capa</Label>
                    <label className="w-full h-40 border border-dashed border-border/40 rounded-xl cursor-pointer flex items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors group">
                      {image ? (
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <img src={image} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Upload className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <ImageIcon className="w-6 h-6 mb-2" />
                          <span className="text-xs">Clique para upload</span>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error("❌ Imagem muito grande. Máximo 5MB");
                              return;
                            }
                            handleImageUpload(file);
                            toast.success("✅ Imagem selecionada");
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Coluna Direita - Preview (Desktop) */}
            {showPreview && (
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <Card className="p-6 bg-card/50 backdrop-blur-xl border border-border/30">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Preview
                      </h3>
                      <Badge variant="secondary">{services.length} serviços</Badge>
                    </div>

                    <div className="space-y-4">
                      {image && (
                        <div className="w-full h-48 rounded-xl overflow-hidden">
                          <img src={image} className="w-full h-full object-cover" alt="Preview" />
                        </div>
                      )}

                      <div>
                        <h4 className="font-bold text-xl mb-2">
                          {companyName || "Nome da Empresa"}
                        </h4>
                        {companyDescription && (
                          <p className="text-sm text-muted-foreground mb-3">{companyDescription}</p>
                        )}
                        {category && (
                          <Badge variant="secondary" className="mb-3">
                            {category.replace('-', ' ')}
                          </Badge>
                        )}
                      </div>

                      {location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{location}</span>
                        </div>
                      )}

                      {availability && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{availability}</span>
                        </div>
                      )}

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {tags.map((t, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {services.length > 0 && (
                        <div className="pt-4 border-t border-border/30">
                          <h5 className="font-semibold mb-3">Serviços</h5>
                          <div className="space-y-2">
                            {services.map((s) => (
                              <div key={s.id} className="p-3 border border-border/30 rounded-lg">
                                <div className="font-medium text-sm">{s.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {s.price && <span className="text-primary">{s.price}</span>}
                                  {s.duration && <span className="ml-2">{s.duration} min</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!companyName && services.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground text-sm">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p>Preencha o formulário para ver o preview</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Botão Submit */}
          <div className="mt-8">
            <Card className="p-4 bg-card/50 backdrop-blur-xl border border-border/30">
              <Button
                className="w-full h-12 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white"
                onClick={handleSubmit}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Criar Empresa
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
