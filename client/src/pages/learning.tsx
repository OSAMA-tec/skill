
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Play,
  Clock,
  Star,
  Users,
  Search,
  Filter,
  Award,
  TrendingUp,
  Video,
  FileText,
  Headphones,
  Download,
  Bookmark,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export default function Learning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const learningPaths = [
    {
      id: "1",
      title: "Mastering UI/UX Design",
      description: "Complete guide from beginner to advanced UI/UX design principles",
      progress: 68,
      totalLessons: 24,
      completedLessons: 16,
      duration: "12 hours",
      difficulty: "Intermediate",
      instructor: "Sarah Chen",
      rating: 4.9,
      students: 1247,
      category: "design",
      thumbnail: "🎨",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping"]
    },
    {
      id: "2", 
      title: "Full-Stack Web Development",
      description: "Learn React, Node.js, and database integration for modern web apps",
      progress: 23,
      totalLessons: 36,
      completedLessons: 8,
      duration: "20 hours",
      difficulty: "Advanced",
      instructor: "Alex Rodriguez",
      rating: 4.8,
      students: 892,
      category: "development",
      thumbnail: "💻",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
    },
    {
      id: "3",
      title: "Digital Marketing Fundamentals",
      description: "Master SEO, social media marketing, and content strategy",
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      duration: "8 hours",
      difficulty: "Beginner",
      instructor: "Emma Johnson",
      rating: 4.7,
      students: 2156,
      category: "marketing",
      thumbnail: "📱",
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics"]
    }
  ];

  const workshops = [
    {
      id: "1",
      title: "Advanced Figma Techniques",
      date: "2024-01-25",
      time: "2:00 PM EST",
      duration: "90 minutes",
      instructor: "Design Pro",
      attendees: 45,
      maxAttendees: 50,
      type: "live",
      price: "Free for Premium members"
    },
    {
      id: "2",
      title: "React Performance Optimization",
      date: "2024-01-28",
      time: "6:00 PM EST", 
      duration: "2 hours",
      instructor: "Code Master",
      attendees: 23,
      maxAttendees: 30,
      type: "live",
      price: "1 skill credit"
    },
    {
      id: "3",
      title: "Building Personal Brand",
      date: "2024-02-02",
      time: "11:00 AM EST",
      duration: "1 hour",
      instructor: "Brand Expert",
      attendees: 67,
      maxAttendees: 100,
      type: "recorded",
      price: "Free"
    }
  ];

  const categories = [
    { id: "all", name: "All Courses", count: 156 },
    { id: "design", name: "Design", count: 45 },
    { id: "development", name: "Development", count: 67 },
    { id: "marketing", name: "Marketing", count: 34 },
    { id: "business", name: "Business", count: 28 }
  ];

  const achievements = [
    { id: "1", title: "First Course Complete", icon: "🎓", earned: true },
    { id: "2", title: "Design Specialist", icon: "🎨", earned: true },
    { id: "3", title: "Quick Learner", icon: "⚡", earned: false },
    { id: "4", title: "Knowledge Sharer", icon: "📚", earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Learning Hub</h1>
            <p className="text-muted-foreground mt-2">
              Expand your skills and unlock new opportunities
            </p>
          </div>
          
          <Button>
            <BookOpen className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="browse">Browse All</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <div className="grid gap-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="text-6xl">{path.thumbnail}</div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                            <p className="text-muted-foreground text-sm">{path.description}</p>
                          </div>
                          <Badge variant="outline">{path.difficulty}</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{path.completedLessons}/{path.totalLessons} lessons</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <p className="font-medium">{path.duration}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Instructor:</span>
                              <p className="font-medium">{path.instructor}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              {path.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {path.students.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Bookmark className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm">
                              <Play className="w-4 h-4 mr-1" />
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path) => (
                  <Card key={path.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{path.thumbnail}</div>
                        <h3 className="font-semibold">{path.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Level:</span>
                          <Badge variant="outline" className="text-xs">{path.difficulty}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{path.rating}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4">
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="mt-6">
            <div className="space-y-6">
              {workshops.map((workshop) => (
                <Card key={workshop.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{workshop.title}</h3>
                        <p className="text-sm text-muted-foreground">by {workshop.instructor}</p>
                      </div>
                      <Badge variant={workshop.type === "live" ? "default" : "secondary"}>
                        {workshop.type}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date & Time:</span>
                        <p className="font-medium">{workshop.date} at {workshop.time}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{workshop.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Attendees:</span>
                        <p className="font-medium">{workshop.attendees}/{workshop.maxAttendees}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium text-green-600">{workshop.price}</span>
                      </div>
                      <Button>
                        <Video className="w-4 h-4 mr-2" />
                        Join Workshop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border text-center ${
                          achievement.earned ? 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800' : 'opacity-50'
                        }`}
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        {achievement.earned && (
                          <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Courses Completed</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hours Learned</span>
                    <span className="font-bold">47h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skills Acquired</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Learning Streak</span>
                    <span className="font-bold">12 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
